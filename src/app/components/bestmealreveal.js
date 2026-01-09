"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function BestMealReveal({ imageSrc }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("line1");

          const timers = [
            setTimeout(() => setPhase("line2"), 3300), // 2.5s hold + 0.8s fade
            setTimeout(() => setPhase("main"), 7200),  // 2.5s hold + 0.8s fade + 0.6s delay
          ];

          return () => timers.forEach(clearTimeout);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [phase]);

  return (
    <section
      ref={ref}
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Line 1 */}
      <AnimatePresence mode="wait">
        {phase === "line1" && (
          <motion.div
            key="line1"
            className="absolute text-white text-2xl sm:text-4xl lg:text-5xl font-light text-center px-6 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            You’ve always had a thing for food — not just eating it, but really appreciating it.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Line 2 */}
      <AnimatePresence mode="wait">
        {phase === "line2" && (
          <motion.div
            key="line2"
            className="absolute text-white text-2xl sm:text-4xl lg:text-5xl font-light text-center px-6 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            You’ve cooked a lot of meals over the years, but one stood out above the rest…
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {phase === "main" && (
          <motion.div
            key="main"
            className="flex flex-col items-center justify-center w-full h-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-['Londrina_Outline'] text-white text-5xl sm:text-7xl mb-10 text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              The Best
            </motion.h2>

            <motion.img
              src={imageSrc}
              alt="Best Meal"
              className="max-w-[90vw] max-h-[70vh] object-contain rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}