import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  shadow = true,
  padding = true,
  ...props
}) {
  return (
    <motion.div
      className={`
        bg-dark/80 rounded-xl overflow-hidden
        ${padding ? 'p-6' : ''}
        ${shadow ? 'shadow-xl' : ''}
        ${hover ? 'hover:shadow-2xl hover:bg-dark/90 transition duration-300' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}