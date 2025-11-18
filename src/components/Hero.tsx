import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Delicious ice cream and beverages"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Delight in Every
            </span>
            <br />
            <span className="text-foreground">Scoop & Sip!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Experience the finest ice cream, coffee, yogurt, and fresh juices in Mlolongo. 
            Where every bite and sip brings joy!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg shadow-glow">
              <Link to="/order">
                Order Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg">
              <Link to="/menu">
                View Menu
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild className="text-lg">
              <a href="tel:0712347926">
                <Phone className="mr-2 w-5 h-5" />
                Call Us
              </a>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">Mlolongo, Impala Driving School</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours</p>
              <p className="font-semibold">8:00 AM - 10:00 PM Daily</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Call</p>
              <p className="font-semibold">0712347926</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
