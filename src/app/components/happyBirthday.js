"use client";
import { motion } from "framer-motion";

export default function HappyBirthday({toggleForm}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center 
      overflow-hidden relative px-6 sm:px-10">

      {/* Floating confetti */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              scale: Math.random() * 1.5 + 0.5,
            }}
            animate={{
              y: window.innerHeight + 40,
              x: `+=${Math.random() * 100 - 50}`,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Main text */}
      <motion.h1
        className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold 
        drop-shadow-xl text-center leading-tight z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Happy Birthday Bailei
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-white text-lg sm:text-2xl md:text-3xl mt-4 sm:mt-6 
        text-center max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        You’re loved more than you know
      </motion.p>

      {/* Button */}
      <motion.div
        className="mt-8 sm:mt-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
      </motion.div>
    </div>
  );
}
