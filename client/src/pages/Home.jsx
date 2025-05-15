import { motion } from 'framer-motion';
import homepageImage from '../assets/Pictures/homepageImage.webp'; 

export default function Home() {
  return (
    <main className="bg-dark text-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 grid md:grid-cols-2 items-center gap-10">
        
        {/* LEFT: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold text-primary leading-tight drop-shadow">
            Conscious Cannabis Consulting
          </h1>
          <p className="text-lg text-gray-300">
            Grounded in Colorado's recreational and medical markets, we help cannabis businesses grow responsibly and sustainably.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            Grow with Us
          </motion.button>
        </motion.div>

        {/* RIGHT: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full overflow-hidden rounded-xl shadow-xl group"
        >
          <img
            src={homepageImage}
            alt="Cannabis cultivation"
            className="object-cover w-full h-[500px] group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-xl pointer-events-none" />
        </motion.div>
        
      </div>
    </main>
  );
}