import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { menuData } from "@/data/menuData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Loader2 } from "lucide-react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  flavors?: string[];
  category: string;
}

const Order = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (item: { name: string; price: string | { small: string; large: string }; flavors?: string[] }, category: string, size?: "small" | "large") => {
    let price = 0;
    
    if (typeof item.price === "string") {
      // Handle ranges like "50-100"
      if (item.price.includes("-")) {
        price = parseInt(item.price.split("-")[0]);
      } else {
        price = parseInt(item.price) || 0;
      }
    } else if (item.price && size) {
      price = parseInt(item.price[size]);
    }

    if (price === 0) return;

    const itemName = size ? `${item.name} (${size})` : item.name;

    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.name === itemName);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { name: itemName, price, quantity: 1, flavors: item.flavors, category }];
    });

    toast({
      title: "Added to cart",
      description: `${itemName} added successfully`,
    });
  };

  const updateQuantity = (itemName: string, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.name === itemName
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (itemName: string) => {
    setCart(prev => prev.filter(item => item.name !== itemName));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!customerName || !customerPhone) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    if (deliveryMethod === "delivery" && !deliveryAddress) {
      toast({
        title: "Missing Address",
        description: "Please provide a delivery address",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          total_amount: getTotalAmount(),
          delivery_method: deliveryMethod,
          delivery_address: deliveryMethod === "delivery" ? deliveryAddress : null,
          notes: notes || null,
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
        flavors: item.flavors || null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Order Created",
        description: "Initiating M-Pesa payment...",
      });

      // Initiate M-Pesa STK Push
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        "mpesa-stk-push",
        {
          body: {
            orderId: order.id,
            phoneNumber: customerPhone,
            amount: getTotalAmount(),
          },
        }
      );

      if (paymentError) throw paymentError;

      if (paymentData.success) {
        toast({
          title: "Payment Request Sent",
          description: "Please check your phone and enter your M-Pesa PIN to complete payment",
        });

        // Clear form and cart
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerEmail("");
        setDeliveryAddress("");
        setNotes("");
      } else {
        throw new Error(paymentData.error || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Place Your Order
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Add items to cart and pay securely via M-Pesa
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Items */}
            <div className="lg:col-span-2 space-y-8">
              {menuData.map((category, idx) => (
                <Card key={idx} className="border-none shadow-card">
                  <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item, itemIdx) => {
                      const hasPrice = item.price && item.price !== "";
                      if (!hasPrice) return null;

                      const hasSizes = typeof item.price === "object";

                      return (
                        <div
                          key={itemIdx}
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            {item.flavors && item.flavors.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                {item.flavors.slice(0, 3).join(", ")}
                                {item.flavors.length > 3 && "..."}
                              </p>
                            )}
                            <p className="text-sm font-bold text-primary mt-1">
                              {typeof item.price === "string"
                                ? `Ksh ${item.price}`
                                : `Small: Ksh ${item.price.small} / Large: Ksh ${item.price.large}`}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {hasSizes ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(item, category.title, "small")}
                                >
                                  + Small
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => addToCart(item, category.title, "large")}
                                >
                                  + Large
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => addToCart(item, category.title)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart & Checkout */}
            <div className="space-y-6">
              {/* Cart */}
              <Card className="border-none shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Your Cart
                    {cart.length > 0 && (
                      <Badge variant="secondary">{cart.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Your cart is empty
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 pb-4 border-b border-border last:border-0"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Ksh {item.price} × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.name, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-bold w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.name, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.name)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary">
                            Ksh {getTotalAmount()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Details */}
              {cart.length > 0 && (
                <Card className="border-none shadow-card">
                  <CardHeader>
                    <CardTitle>Checkout Details</CardTitle>
                    <CardDescription>
                      Enter your information to complete the order
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">M-Pesa Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="07XXXXXXXX"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Payment request will be sent to this number
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <Label>Delivery Method *</Label>
                      <RadioGroup
                        value={deliveryMethod}
                        onValueChange={(value: "pickup" | "delivery") =>
                          setDeliveryMethod(value)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup">Pickup from cafe</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery">Delivery</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <div>
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Enter your delivery address"
                          rows={3}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special instructions?"
                        rows={2}
                      />
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full shadow-glow"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Ksh {getTotalAmount()} via M-Pesa
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      You'll receive an M-Pesa prompt on your phone to complete payment
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Order;
