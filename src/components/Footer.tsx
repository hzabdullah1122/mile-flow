import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-logistics-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded">
                <img src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png" alt="Fleetory Logo" className="h-[120px] w-auto" />
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Professional same-day courier services across the UK. 
              From an urgent envelope to a few pallets, Fleetory has you covered.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link 
                  to="/services/same-day-delivery" 
                  className="hover:text-logistics-orange transition-colors duration-200"
                >
                  Standard Same Day Delivery
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/timed-delivery" 
                  className="hover:text-logistics-orange transition-colors duration-200"
                >
                  Timed Delivery
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/fleet" className="hover:text-logistics-orange transition-colors duration-200">Fleet</Link></li>
              <li><Link to="/industries" className="hover:text-logistics-orange transition-colors duration-200">Industries</Link></li>
              <li><Link to="/about" className="hover:text-logistics-orange transition-colors duration-200">About Us</Link></li>
              <li><Link to="/booking" className="hover:text-logistics-orange transition-colors duration-200">Get Quote</Link></li>
              <li><Link to="/contact" className="hover:text-logistics-orange transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <Phone className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <div className="text-white/80">
                  <div>
                      <a href="tel:+447539868853" className="hover:text-logistics-orange">
                        +44 7539868853
                      </a>
                    </div>
                    <div>
                      <a href="tel:+447352288232" className="hover:text-logistics-orange">
                        +44 7352288232
                      </a>
                    </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <a 
                  href="https://wa.me/447352288232" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-logistics-orange transition-colors duration-200"
                >
                  Contact us via WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <span className="text-white/80">Fleetory@outlook.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-logistics-orange flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <p>Available nationwide</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Fleetory. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-logistics-orange transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-logistics-orange transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-logistics-orange transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
          
          {/* Developer Credit */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Developed by{" "}
              <a 
                href="https://webcraftio.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-logistics-orange hover:text-logistics-orange-light transition-colors duration-200"
              >
                WebCraftio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;