"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";

export default function FloatingGallery({ images }) {
  const [showIntro, setShowIntro] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
  if (inView && !showIntro && !showGallery) {
    setShowIntro(true);
  }
}, [inView, showIntro, showGallery]);

  useEffect(() => {
    if (showIntro) {
      const holdTimer = setTimeout(() => {
        // Trigger fade-out
        setShowIntro(false);
        // Delay gallery fade-in until fade-out completes
        const galleryTimer = setTimeout(() => {
          setShowGallery(true);
        }, 1000); // match exit duration
        return () => clearTimeout(galleryTimer);
      }, 1000); // hold intro for 3s
      return () => clearTimeout(holdTimer);
    }
  }, [showIntro]);

  const positions = useMemo(() => {
    const size = 64;
    const padding = 12;
    const boxSize = 500;
    const attempts = 100;
    const placed = [];

    const isTooClose = (x, y) => {
      return placed.some(([px, py]) => {
        const dx = x - px;
        const dy = y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < size + padding;
      });
    };

    const results = [];

    for (let i = 0; i < images.length; i++) {
      let x, y, tries = 0;
      do {
        x = Math.random() * (boxSize - size);
        y = Math.random() * (boxSize - size);
        tries++;
      } while (isTooClose(x, y) && tries < attempts);

      placed.push([x, y]);
      results.push({
        top: `${(y / boxSize) * 100}%`,
        left: `${(x / boxSize) * 100}%`,
      });
    }

    return results;
  }, [images]);

  return (
    <section ref={ref} className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center mt-10 relative pb-8 overflow-hidden">
        {/* Intro message */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              key="intro"
              className="absolute text-white text-5xl sm:text-6xl z-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Time to reminisce
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title and gallery */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              key="gallery"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="font-['Londrina_Outline'] text-center text-4xl sm:text-1xl lg:text-6xl font-semibold text-white mb-20 z-10"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Click on a picture to zoom
              </motion.h2>

              <motion.div
                className="flex justify-center items-center w-full z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="relative aspect-square max-w-[95vw] lg:max-w-[40vw] md:max-w-[50vw] max-h-[95vh] w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
                  {images.map((src, i) => {
                    const { top, left } = positions[i];
                    const delay = Math.random() * 2;

                    return (
                      <motion.img
                        key={i}
                        src={src}
                        alt={`Floating ${i}`}
                        className="absolute w-16 h-16 object-cover rounded-full shadow-md cursor-pointer"
                        style={{ top, left }}
                        animate={{
                          y: [0, -10, 0],
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay,
                        }}
                        onClick={() => setActiveImage(src)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoomed image */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ backgroundColor: "rgba(0,0,0,0)" }}
              animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              exit={{ backgroundColor: "rgba(0,0,0,0)" }}
              onClick={() => setActiveImage(null)}
            >
              <motion.img
                src={activeImage}
                alt="Zoomed"
                className="w-[90%] h-[90%] object-contain"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}