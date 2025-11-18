import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import iceCreams from "@/assets/ice-cream-variety.jpg";
import yogurt from "@/assets/yogurt-parfait.jpg";
import juices from "@/assets/juices-smoothies.jpg";
import coffee from "@/assets/coffee-latte.jpg";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const products = [
    {
      title: "Ice Cream",
      description: "Premium flavors from Strawberry to Pistachio",
      image: iceCreams,
      price: "From Ksh 10",
      gradient: "from-pink via-pink/50 to-transparent",
    },
    {
      title: "Fresh Yogurt",
      description: "Creamy yogurt with fresh berries",
      image: yogurt,
      price: "From Ksh 50",
      gradient: "from-purple via-purple/50 to-transparent",
    },
    {
      title: "Fresh Juices",
      description: "100% natural fruit juices & smoothies",
      image: juices,
      price: "From Ksh 50",
      gradient: "from-orange via-orange/50 to-transparent",
    },
    {
      title: "Premium Coffee",
      description: "Expertly crafted coffee & tea",
      image: coffee,
      price: "From Ksh 80",
      gradient: "from-blue via-blue/50 to-transparent",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Our Specialties
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our delicious range of treats made with love and the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-card hover:shadow-glow transition-smooth group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-60`} />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-2xl drop-shadow-lg">{product.title}</p>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-base">{product.description}</CardDescription>
                <CardTitle className="text-primary text-xl">{product.price}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/menu">
              View Full Menu
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
