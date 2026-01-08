import { useEffect, useState } from "react";
import MessageBubble from "./messagebubble";
import { TypingIndicator } from "./typingindicator";

export default function MessageList({ messages }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, messages.length]);

  const isTyping = visibleCount < messages.length;
  const nextMessage = messages[visibleCount]; // the upcoming message

  return (
    <section className="min-h-screen flex justify-center">
  <div className="w-full max-w-xl flex flex-col px-4 py-10 space-y-4">

    {messages.slice(0, visibleCount).map((msg, i) => (
      <MessageBubble
        key={i}
        text={msg.text}
        name={msg.name}
        isSender={msg.sender === "user"}
      />
    ))}

    {isTyping && (
      <TypingIndicator isSender={nextMessage.sender === "user"} />
    )}

  </div>
</section>


  );
}
