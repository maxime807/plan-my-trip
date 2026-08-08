import { MapPin, Plane } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="text-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center gap-3 mb-4"
      >
        <div className="bg-gradient-to-tr from-[#D4A373] to-[#FAEDCD] text-white p-3 rounded-2xl shadow-sm">
          <Plane size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#4A4A40]">
          PlanMyTrip <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#BFA081]">AI</span>
        </h1>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-[#8B8B80] max-w-2xl mx-auto font-medium"
      >
        Votre week-end parfait sur-mesure en 3 clics ✨
      </motion.p>
    </div>
  );
}
