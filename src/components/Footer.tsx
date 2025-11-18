import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Creamy Corner Cafe</h3>
            <p className="text-sm text-muted-foreground">
              Your go-to spot for delicious ice cream, yogurt, milkshakes, coffee, and fresh juices in Mlolongo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>Mlolongo, next to Impala Driving School</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:0712347926" className="hover:text-primary transition-smooth">0712347926</a>
                  <a href="tel:0706752664" className="hover:text-primary transition-smooth">0706752664</a>
                </div>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <a href="mailto:naylorjonas@gmail.com" className="hover:text-primary transition-smooth">
                  naylorjonas@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Business Hours</p>
              <p>Mon - Sun: 8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Creamy Corner Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
