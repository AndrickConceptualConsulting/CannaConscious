import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../../assets/Logos/med-light - Copy.webp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/90 backdrop-blur-md py-2 shadow-lg' 
          : 'bg-gradient-to-r from-accent to-primary py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
            <motion.img 
              src={logo} 
              alt="CannaConscious logo" 
              className="h-10 w-auto" 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <Link 
              to="/book-online" 
              className="bg-black text-primary px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/about">About</MobileNavLink>
              <MobileNavLink to="/services">Services</MobileNavLink>
              <MobileNavLink to="/contact">Contact</MobileNavLink>
              <div className="pt-2">
                <Link 
                  to="/book-online" 
                  className="block w-full text-center bg-primary text-black px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Desktop NavLink component
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`text-white hover:text-primary text-shadow transition duration-200 relative ${
        isActive ? 'font-medium' : ''
      }`}
    >
      {children}
      {isActive && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-primary"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`block py-2 px-3 rounded-md ${
        isActive 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'text-white hover:bg-gray-800'
      }`}
    >
      {children}
    </Link>
  );
}