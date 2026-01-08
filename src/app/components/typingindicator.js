import { motion } from "framer-motion";

export function TypingIndicator({ isSender }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isSender ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`max-w-xs p-3 rounded-2xl mb-4 ${
        isSender
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      <div className="flex space-x-1">
        <span className="animate-bounce">•</span>
        <span className="animate-bounce delay-150">•</span>
        <span className="animate-bounce delay-300">•</span>
      </div>
    </motion.div>
  );
}

