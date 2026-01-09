"use client";
import { motion } from "framer-motion";

export default function WrappedFact({ fact }) {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 sm:px-10 py-16 relative">
      <motion.h2
        className="text-white text-6xl sm:text-6xl md:text-7xl font-bold text-center z-10 font-['Londrina_Outline'] drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
      >
        Did you know?
      </motion.h2>

      <motion.p
        className="text-white text-3xl sm:text-3xl md:text-4xl mt-6 text-center max-w-2xl z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {fact}
      </motion.p>
    </div>
  );
}