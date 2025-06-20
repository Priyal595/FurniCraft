import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FurniCraft</h3>
            <p className="text-gray-400 mb-4">
              Premium furniture for your home and office. Quality craftsmanship since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">123 Furniture St, Design District, IND 144008 </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-400">+91 797-311-7167</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-400">info@furnicraft.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and promotions.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FurniCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;