"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PhotoCarousel({ images }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const x = useMotionValue(0);
  const animationRef = useRef(null);

  // Duplicate images for seamless looping
  const loopImages = [...images, ...images, ...images];

  const [maxDrag, setMaxDrag] = useState(0);

  // Calculate drag limits
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;

    const max = trackWidth - containerWidth;
    setMaxDrag(max > 0 ? max : 0);
  }, [loopImages.length]);

  // Auto-scroll
  useEffect(() => {
    if (maxDrag <= 0) return;

    animationRef.current = animate(x, [0, -maxDrag], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => animationRef.current?.stop();
  }, [maxDrag]);

  return (
    <div className="w-full flex flex-col items-center justify-end h-screen pb-10 px-6">

      {/* Title */}
      <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-10 drop-shadow-lg">
        Bailei Wrapped
      </h2>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="
          relative 
          w-[100%] sm:w-[95%] md:w-[90%] max-w-5xl 
          overflow-hidden 
          rounded-3xl 
          bg-white/5 
          backdrop-blur-sm
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
          border border-white/10
        "
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 px-4 py-6 touch-pan-y"
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => {
            if (animationRef.current) {
              animationRef.current.stop();
              animationRef.current = null;
            }

            x.stop();
            x.set(x.get());
            document.body.style.overflow = "hidden";
          }}
          onDragEnd={() => {
            document.body.style.overflow = "";
          }}
        >
          {loopImages.map((src, i) => (
            <div
              key={i}
              className="
                min-w-[100%] sm:min-w-[85%] md:min-w-[70%] lg:min-w-[55%]
                h-[550px] sm:h-[650px] md:h-[700px]
                rounded-2xl overflow-hidden 
              "
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
