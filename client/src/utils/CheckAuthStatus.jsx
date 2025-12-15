import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import MainPage from "@/pages/MainPage.jsx";
import Hero from "@/pages/Hero.jsx";

function CheckAuthStatus() {
  return (
    <>
      <SignedOut>
        <Hero />
      </SignedOut>
      <SignedIn>
        <MainPage />
      </SignedIn>
    </>
  );
}

export default CheckAuthStatus;
