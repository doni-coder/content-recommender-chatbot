import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full rounded-b-2xl z-50 backdrop-blur-[20px] bg-white/7">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Company Name */}
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          Content<span className="text-blue-400"> Nexus</span>
        </h1>
        <SignedOut>
          <SignInButton className="px-5 py-2 rounded-[5px] cursor-pointer bg-blue-700 hover:bg-blue-500 transition-all text-white font-medium shadow-md backdrop-blur-sm" />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "38px",
                  height: "38px",
                }
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
