import React from "react";
import DarkVeil from "@/components/DarkVeil";
import TextType from "@/components/TextType";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer.jsx";

function Hero() {
  return (
    <>
    <Navbar />
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <DarkVeil noiseIntensity={0.04} warpAmount={0} hueShift={0} speed={1}>
          <div className="flex justify-center h-screen items-center">
            <div className="w-[300px] md:w-[600px]">
              <h1 className="text-white mb-6 text-center md:text-5xl text-5xl font-bold">
                AI That Thinks Like a <br />
                <span className="text-blue-500">
                  <TextType
                    text={["Creator", "Instructor", "Researcher!"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                  />
                </span>
              </h1>
              <p className="text-neutral-200 text-center font-thin md:text-[14px] text-sm">
                Built with LLMs and smart recommendation models, it learns your
                style and suggests ideas that fit your niche — saving hours of
                brainstorming every week
              </p>
              <div className="flex justify-center mt-5">
                <button className="py-2 text-center px-6 cursor-pointer border rounded-[3px] border-blue-600 hover:bg-blue-600 transition-all text-white">
                  Get started
                </button>
              </div>
            </div>
          </div>
        </DarkVeil>
      </div>
      <Footer/>
    </>
  );
}

export default Hero;
