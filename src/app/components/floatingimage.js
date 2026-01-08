"use client";
import { useEffect, useRef } from "react";

export default function FloatingImage({ src, size = 120 }) {
  const ref = useRef(null);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const padding = size * 2; // ensures fully off-screen

    // ✅ Random start point (always off-screen)
    let startX, startY;
    const side = Math.floor(Math.random() * 4); // 0=left,1=right,2=top,3=bottom
    if (side === 0) { // left
      startX = -padding;
      startY = Math.random() * H;
    } else if (side === 1) { // right
      startX = W + padding;
      startY = Math.random() * H;
    } else if (side === 2) { // top
      startX = Math.random() * W;
      startY = -padding;
    } else { // bottom
      startX = Math.random() * W;
      startY = H + padding;
    }

    // ✅ Random end point (different side, also off-screen)
    let endX, endY;
    const endSide = (side + Math.floor(Math.random() * 3) + 1) % 4; // ensure different side
    if (endSide === 0) { // left
      endX = -padding;
      endY = Math.random() * H;
    } else if (endSide === 1) { // right
      endX = W + padding;
      endY = Math.random() * H;
    } else if (endSide === 2) { // top
      endX = Math.random() * W;
      endY = -padding;
    } else { // bottom
      endX = Math.random() * W;
      endY = H + padding;
    }

    // ✅ Speed and delay
    const isMobile = W < 640;
    const speed = isMobile
      ? (Math.random() * (10 - 6) + 6).toFixed(1) + "s"
      : (Math.random() * (20 - 12) + 12).toFixed(1) + "s";
    const delay = (Math.random() * 5).toFixed(1) + "s";

    const el = ref.current;
    if (el) {
      el.style.setProperty("--start-x", `${startX}px`);
      el.style.setProperty("--start-y", `${startY}px`);
      el.style.setProperty("--end-x", `${endX}px`);
      el.style.setProperty("--end-y", `${endY}px`);
      el.style.setProperty("--speed", speed);
      el.style.setProperty("--delay", delay);
    }
  }, [size]);

  return (
    <div ref={ref} className="floater">
      <img
        src={src}
        style={{ width: size, height: size }}
        className="pointer-events-none select-none rounded-full object-cover"
        alt=""
      />
    </div>
  );
}
