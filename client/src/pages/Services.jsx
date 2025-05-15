import { motion } from 'framer-motion';
import { LuBriefcase, LuShieldCheck, LuUsers, LuTarget } from 'react-icons/lu';

const services = [
  {
    icon: <LuBriefcase className="text-3xl text-primary mb-4" />,
    title: 'Business Strategy',
    description: 'Tailored growth plans and operational support rooted in cannabis market expertise.',
  },
  {
    icon: <LuShieldCheck className="text-3xl text-primary mb-4" />,
    title: 'Compliance Consulting',
    description: 'Guidance through state and local compliance, audits, and operational readiness.',
  },
  {
    icon: <LuTarget className="text-3xl text-primary mb-4" />,
    title: 'Equity-Focused Advising',
    description: 'Support for equity applicants and mission-driven orgs navigating systemic challenges.',
  },
  {
    icon: <LuUsers className="text-3xl text-primary mb-4" />,
    title: 'Team & Culture Development',
    description: 'Workshops, onboarding, and leadership coaching for healthy, values-aligned teams.',
  },
];

export default function Services() {
  return (
    <main className="min-h-screen px-6 py-20 bg-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto space-y-12"
      >
        <h2 className="text-primary text-4xl font-bold text-center">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-accent/20 to-black/30 p-6 rounded-lg shadow-md border border-white/10 backdrop-blur-sm transition"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}