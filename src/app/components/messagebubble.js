import { motion } from "framer-motion";
import { useInView } from "../services/useInView"

export default function MessageBubble({ text, name, isSender }) {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isSender ? 50 : -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        relative max-w-xs sm:max-w-sm md:max-w-md 
        p-3 sm:p-4 md:p-5 
        text-base sm:text-lg md:text-xl 
        mb-4 rounded-2xl
        ${isSender
          ? "bg-blue-500 text-white self-end rounded-br-md"
          : "bg-gray-200 text-black self-start rounded-bl-md"
        }
      `}
    >
      {text} - {name}

      {/* Tail */}
      <div
        className={`
          absolute bottom-0 w-3 h-3 sm:w-4 sm:h-4
          ${isSender ? "right-0 translate-x-1" : "left-0 -translate-x-1"}
        `}
      >
        <div
          className={`
            w-full h-full rounded-full
            ${isSender ? "bg-blue-500" : "bg-gray-200"}
          `}
        />
      </div>
    </motion.div>
  );
}
