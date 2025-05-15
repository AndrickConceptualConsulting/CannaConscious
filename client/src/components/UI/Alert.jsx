import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi';

export default function Alert({
  type = 'info',
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}) {
  // Auto close after the specified duration if autoClose is true
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  // Icon based on alert type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="h-6 w-6 text-green-400" />;
      case 'error':
        return <HiExclamationCircle className="h-6 w-6 text-red-400" />;
      case 'warning':
        return <HiExclamationCircle className="h-6 w-6 text-yellow-400" />;
      default:
        return <HiInformationCircle className="h-6 w-6 text-primary" />;
    }
  };

  // Background colors based on alert type
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900 border-green-600';
      case 'error':
        return 'bg-red-900 border-red-600';
      case 'warning':
        return 'bg-yellow-900 border-yellow-600';
      default:
        return 'bg-primary/10 border-primary/40';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-20 right-4 z-50 max-w-sm w-full border-l-4 ${getBgColor()} rounded-lg shadow-lg`}
        >
          <div className="p-4 flex items-start">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              {title && <p className="text-sm font-medium text-white">{title}</p>}
              <p className="mt-1 text-sm text-gray-200">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="bg-transparent rounded-md inline-flex text-gray-300 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <HiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}