import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiArrowLeft, HiCalendar, HiHome } from 'react-icons/hi';

import Button from '../components/UI/Button';

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  
  // Redirect to home if accessed directly without state
  useEffect(() => {
    if (!state.from) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);
  
  // Format date if it exists
  const formattedDate = state.date 
    ? new Date(state.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;
  
  // Determine the message based on where the user came from
  const getMessage = () => {
    switch (state.from) {
      case 'contact':
        return {
          title: `Thank you, ${state.name || 'valued customer'}!`,
          message: 'We\'ve received your message and will get back to you shortly. A confirmation email has been sent to your inbox.'
        };
        
      case 'booking':
        return {
          title: `Appointment Confirmed, ${state.name || 'valued customer'}!`,
          message: `Your appointment has been scheduled for ${formattedDate} at ${state.time}. A confirmation email has been sent to your inbox with all the details.`
        };
        
      default:
        return {
          title: 'Thank You!',
          message: 'We appreciate your submission.'
        };
    }
  };
  
  const { title, message } = getMessage();
  
  return (
    <main className="py-20 flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto text-center px-6"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <HiCheckCircle className="text-primary w-12 h-12" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          {title}
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          {message}
        </p>
        
        {state.from === 'booking' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-dark/50 border border-gray-800 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <HiCalendar className="text-primary w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Appointment Details</h2>
            <ul className="text-left space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="font-medium">{formattedDate}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="font-medium">{state.time}</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
              Need to reschedule? Please contact us at (720) 123-4567
            </div>
          </motion.div>
        )}
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          <Button
            primary={false}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center"
          >
            <HiArrowLeft className="mr-2" />
            Go Back
          </Button>
          
          <Link to="/">
            <Button className="flex items-center justify-center w-full">
              <HiHome className="mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}