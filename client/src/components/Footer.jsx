import React from "react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  return (
    <>
      <footer className="w-full bg-black backdrop-blur-md border-t border-gray-700 text-gray-300 py-7">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Left: Brand */}
          <h2 className="text-lg font-semibold text-white mb-3 md:mb-0">
            Content<span className="text-blue-400"> Nexus</span>
          </h2>

          {/* Center: Tagline or Description */}
          <p className="text-sm max-w-md">
            Powered by AI to spark your next viral idea. Create smarter, faster,
            and more creatively with{" "}
            <span className="text-white font-medium">Content Nexus</span>.
          </p>

          {/* Right: Copyright */}
          <p className="text-sm mt-3 md:mt-0 text-gray-400">
            © {new Date().getFullYear()} Content Nexus. All rights reserved.
          </p>
        </div>
      </footer>
      <div className="bg-gray-900 py-1.5">
        <p className="text-center text-[13px] text-neutral-400">
          Design and developed by <a href="https://www.linkedin.com/in/om-prakash-sahu/" target="__blank" className="text-blue-700 font-thin">Om Prakash Sahu</a>
        </p>
      </div>
    </>
  );
}

export default Footer;
