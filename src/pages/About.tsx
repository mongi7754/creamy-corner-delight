import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Sparkles } from "lucide-react";
import cafeExterior from "@/assets/cafe-exterior.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Serving smiles, one scoop at a time
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Welcome to Creamy Corner Cafe, your neighborhood destination for delicious treats in Mlolongo! 
                  We're passionate about bringing joy to our community through high-quality ice cream, fresh juices, 
                  artisan coffee, and creamy yogurt.
                </p>
                <p>
                  Located conveniently next to Impala Driving School, we've become a beloved spot where friends 
                  and families gather to enjoy sweet moments together. Our vibrant, colorful cafe reflects our 
                  mission: to make every visit a memorable experience.
                </p>
                <p>
                  From our signature Heavenly Glory ice cream to our expertly crafted cappuccinos, every item 
                  on our menu is made with care using the finest ingredients. We believe that great taste and 
                  quality should be accessible to everyone.
                </p>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-glow">
              <img
                src={cafeExterior}
                alt="Creamy Corner Cafe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              What We Stand For
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality First</h3>
                <p className="text-muted-foreground">
                  We use only the finest ingredients to create our delicious treats
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Focus</h3>
                <p className="text-muted-foreground">
                  We're proud to serve our Mlolongo community every day
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Every order is prepared with care and attention to detail
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-card hover:shadow-glow transition-smooth">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Always creating new flavors and experiences for you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Us Today!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the difference at Creamy Corner Cafe
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
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
