import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import cafeExterior from "@/assets/cafe-exterior.jpg";
import cafeInterior from "@/assets/cafe-interior.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      
      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to serving you the best treats in town
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Prime Location</h3>
                <p className="text-muted-foreground">
                  Conveniently located in Mlolongo, next to Impala Driving School
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Extended Hours</h3>
                <p className="text-muted-foreground">
                  Open daily from 8:00 AM to 10:00 PM to serve you better
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Ordering</h3>
                <p className="text-muted-foreground">
                  Order via WhatsApp or call us for quick service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Visit Our Cafe
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the vibrant atmosphere and delicious treats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-smooth group">
              <img
                src={cafeExterior}
                alt="Creamy Corner Cafe Exterior"
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Our Storefront</h3>
                <p className="text-white/90">Easy to find, impossible to forget</p>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-smooth group">
              <img
                src={cafeInterior}
                alt="Creamy Corner Cafe Interior"
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Vibrant Interior</h3>
                <p className="text-white/90">A colorful space for great moments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
