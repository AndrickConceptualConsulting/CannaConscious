// src/pages/About.jsx
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="min-h-screen px-6 py-20 bg-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h2 className="text-primary text-4xl font-bold">About CannaConscious</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          CannaConscious was founded to bring thoughtful, equity-centered support to cannabis businesses.
          With roots in Colorado’s recreational and medical markets, we help mission-driven organizations
          grow responsibly, sustainably, and with integrity.
        </p>

        <p className="text-lg text-gray-300">
          Our team combines deep industry expertise with a people-first approach, helping dispensaries,
          growers, consultants, and educators navigate this evolving field with intention and strategy.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 bg-primary text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
        >
          Meet the Team
        </motion.button>
      </motion.div>
    </main>
  );
}
