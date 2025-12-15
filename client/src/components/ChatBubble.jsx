import React from "react";

function ChatBubble({ message, sender = "user" }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-md ${
          isUser
            ? "bg-neutral-800 text-white rounded-br-none"
            : "bg-neutral-700 text-white rounded-bl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatBubble;
