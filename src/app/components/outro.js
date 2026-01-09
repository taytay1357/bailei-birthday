"use client";
import { motion } from "framer-motion";

export default function Outro({ toggleForm }) {
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
        className="text-white text-6xl sm:text-9xl md:text-9xl font-extrabold 
        drop-shadow-xl text-center leading-tight z-10 font-['Londrina_Outline'] mb-8"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Happy Birthday Bailei
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-white text-2xl sm:text-4xl md:text-5xl mt-4 sm:mt-6 
        text-center max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Have an amazing day.
      </motion.p>

      {/* P.S. line */}
      <motion.p
        className="text-white text-lg sm:text-xl mt-6 text-center z-10 italic opacity-80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        P.S. you will find me in the doghouse.
      </motion.p>

      {/* Image */}
      <motion.img
        src="/images/doghouse.jpg"
        alt="Doghouse"
        className="mt-6 w-40 sm:w-52 md:w-64 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      />
    </div>
  );
}