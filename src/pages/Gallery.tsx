import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import cafeExterior from "@/assets/cafe-exterior.jpg";
import cafeInterior from "@/assets/cafe-interior.jpg";
import iceCreams from "@/assets/ice-cream-variety.jpg";
import yogurt from "@/assets/yogurt-parfait.jpg";
import juices from "@/assets/juices-smoothies.jpg";
import coffee from "@/assets/coffee-latte.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const Gallery = () => {
  const galleryItems = [
    {
      image: cafeExterior,
      title: "Our Storefront",
      description: "Welcome to Creamy Corner Cafe",
      category: "Cafe",
    },
    {
      image: cafeInterior,
      title: "Vibrant Interior",
      description: "Our colorful and cozy seating area",
      category: "Cafe",
    },
    {
      image: heroBanner,
      title: "Sweet Treats",
      description: "Ice cream, coffee, and more",
      category: "Products",
    },
    {
      image: iceCreams,
      title: "Ice Cream Selection",
      description: "Premium flavors with colorful toppings",
      category: "Products",
    },
    {
      image: yogurt,
      title: "Fresh Yogurt",
      description: "Creamy yogurt with fresh berries",
      category: "Products",
    },
    {
      image: juices,
      title: "Fresh Juices",
      description: "100% natural fruit juices",
      category: "Products",
    },
    {
      image: coffee,
      title: "Artisan Coffee",
      description: "Expertly crafted cappuccinos",
      category: "Products",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take a visual journey through our cafe and delicious offerings
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-smooth cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-smooth">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-semibold mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Visit Us Today!
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience these delicious treats in person at our Mlolongo location
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254712347926"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth shadow-glow"
            >
              Order on WhatsApp
            </a>
            <a
              href="tel:0712347926"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
