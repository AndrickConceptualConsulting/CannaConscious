import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  primary = true, 
  onClick, 
  type = 'button', 
  fullWidth = false,
  className = '',
  ...props 
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${primary ? 'bg-primary text-black' : 'bg-transparent border border-primary text-primary'} 
        px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl 
        transition duration-300 ease-in-out
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}