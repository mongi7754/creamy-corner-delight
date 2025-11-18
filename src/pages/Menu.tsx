import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { menuData, MenuItem } from "@/data/menuData";

const Menu = () => {
  const renderPrice = (price: string | { small: string; large: string }) => {
    if (typeof price === "string") {
      return price ? `Ksh ${price}` : "";
    }
    return `Ksh ${price.small} / ${price.large}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Our Menu
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of ice cream, yogurt, juices, and more
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {menuData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {category.title}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item: MenuItem, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="border-none shadow-card hover:shadow-glow transition-smooth"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span>{item.name}</span>
                        {item.price && (
                          <Badge variant="secondary" className="text-base font-bold">
                            {renderPrice(item.price)}
                          </Badge>
                        )}
                      </CardTitle>
                      {item.description && (
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    {item.flavors && item.flavors.length > 0 && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Available Flavors:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.flavors.map((flavor, flavorIndex) => (
                            <Badge
                              key={flavorIndex}
                              variant="outline"
                              className="border-primary/20 text-primary"
                            >
                              {flavor}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Wholesale Information */}
          <Card className="border-none shadow-card bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 mt-12">
            <CardHeader>
              <CardTitle className="text-2xl">Wholesale Orders</CardTitle>
              <CardDescription className="text-base">
                We offer bulk ordering for events, parties, and businesses. Contact us for special pricing on large orders!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="https://wa.me/254712347926" target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:0712347926">
                    Call for Wholesale
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
