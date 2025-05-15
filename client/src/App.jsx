import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BookOnline from './pages/BookOnline';
import ThankYou from './pages/ThankYou';

// Page wrapper with animation
const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
    className="min-h-screen pt-16" // Add padding for fixed navbar
  >
    {children}
  </motion.div>
);

// Route wrapper with AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrap><Home /></PageWrap>} />
        <Route path="/about" element={<PageWrap><About /></PageWrap>} />
        <Route path="/services" element={<PageWrap><Services /></PageWrap>} />
        <Route path="/contact" element={<PageWrap><Contact /></PageWrap>} />
        <Route path="/book-online" element={<PageWrap><BookOnline /></PageWrap>} />
        <Route path="/thank-you" element={<PageWrap><ThankYou /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
}

// Main app component
export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Simulate initial loading state for smoother transitions
  useEffect(() => {
    // Add a short timeout to simulate preloading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="bg-dark min-h-screen flex flex-col items-center justify-center text-white font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-bold text-primary">CannaConscious</h1>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-dark min-h-screen text-white font-sans flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}