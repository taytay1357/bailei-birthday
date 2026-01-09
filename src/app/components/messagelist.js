"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import MessageBubble from "./messagebubble";
import { TypingIndicator } from "./typingindicator";

export default function MessageList({ messages }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (!inView) return; // don't start until in view
    if (visibleCount < messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, messages.length, inView]);

  const isTyping = visibleCount < messages.length;
  const nextMessage = messages[visibleCount];

  return (
    <section ref={ref} className="min-h-screen flex justify-center">
      <div className="w-full max-w-xl flex flex-col px-4 py-10 space-y-4">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <MessageBubble
            key={i}
            text={msg.text}
            name={msg.name}
            isSender={msg.sender === "user"}
          />
        ))}

        {inView && isTyping && (
          <TypingIndicator isSender={nextMessage.sender === "user"} />
        )}
      </div>
    </section>
  );
}
