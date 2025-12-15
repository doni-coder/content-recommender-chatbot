import React from "react";
import ChatBubble from "@/components/ChatBubble";

function ChatInterface() {
  return (
    <div className="w-full sm:w-[700px] pt-10 pb-10 px-8 sm:px-0 bg-neutral-900  h-full">
      <ChatBubble message={"Hii how can i help you?"} sender="bot" />
      <ChatBubble
        message={"I want some content idea about my neiche"}
        sender="user"
      />
      <ChatBubble
        message={"Ok here are some topic idea about your neiche :"}
        sender="bot"
      />
      <ChatBubble
        message={
          "hii there hfuihsuidfhuisdh      fsssssssssssssssssss ssssssssssssssssssssss ssssssssssss ssssssssssssssssssss ssssssssssssssss sdifuihuifg irfgui"
        }
        sender="bot"
      />
    </div>
  );
}

export default ChatInterface;
