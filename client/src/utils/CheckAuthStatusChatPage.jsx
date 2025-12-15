import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatPage from "@/pages/ChatPage";
import Hero from "@/pages/Hero.jsx";

function CheckAuthStatusChatPage() {
  return (
    <>
      <SignedOut>
        <Hero />
      </SignedOut>
      <SignedIn>
        <ChatPage />
      </SignedIn>
    </>
  )
}

export default CheckAuthStatusChatPage