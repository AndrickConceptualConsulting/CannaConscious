import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Column 1 - About */}
          <div>
            <h3 className="text-primary text-lg font-bold mb-4">CannaConscious</h3>
            <p className="text-gray-300 mb-4">
              Helping cannabis businesses grow responsibly and sustainably through conscious 
              consulting services.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-primary transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-primary transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-primary transition">
                <FaLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-primary transition">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-primary text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/book-online" className="text-gray-300 hover:text-primary transition">
                  Book Online
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-primary text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Denver, Colorado</p>
              <p>
                <a href="mailto:contact@cannaconscious.com" className="hover:text-primary transition">
                  contact@cannaconscious.com
                </a>
              </p>
              <p>
                <a href="tel:+17201234567" className="hover:text-primary transition">
                  (720) 123-4567
                </a>
              </p>
            </address>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} CannaConscious. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}