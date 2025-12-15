import React, { useEffect } from "react";
import Drawer from "@/components/Drawer";
import { CgMenuLeft } from "react-icons/cg";
import { useProvider } from "@/context/ContextProvider";
import "@/css/Scrollbar.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { ToastContainer, toast, Slide } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChatInterface from "@/components/ChatInterface";

function ChatPage() {
  const { state, dispatch } = useProvider();

  useEffect(() => {
    if (state.alertMessage) {
      toast(state.alertMessage);
      dispatch({ type: "setAlertMessage", payload: "" });
    }
  }, [state.alertMessage]);

  return (
    <div className="relative flex flex-col bg-neutral-900 w-full h-screen overflow-hidden">
      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        transition={Slide}
      />

      {/* Drawer */}
      <Drawer />

      {/* Header */}
      <div className="px-8 py-2.5 flex justify-between items-center border-b border-neutral-800 shrink-0">
        <CgMenuLeft
          onClick={() => dispatch({ type: "setDrawer", payload: true })}
          size={25}
          className="cursor-pointer text-white"
        />
        <div className="flex gap-2">
          {/* Platform Select */}
          <Select>
            <SelectTrigger className="w-[110px] sm:w-[180px] text-neutral-300">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900">
              <SelectGroup>
                <SelectLabel>Platforms</SelectLabel>
                <SelectItem className="text-neutral-300" value="youtube">
                  Youtube
                </SelectItem>
                <SelectItem className="text-neutral-300" value="instagram">
                  Instagram
                </SelectItem>
                <SelectItem className="text-neutral-300" value="facebook">
                  Facebook
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Category Select */}
          <Select>
            <SelectTrigger className="w-[150px] text-neutral-300 sm:w-[280px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900">
              {/* --- Entertainment --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Entertainment</SelectLabel>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="vlog">Vlogs</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="film">Movies & Trailers</SelectItem>
                <SelectItem value="animation">Animation</SelectItem>
                <SelectItem value="shorts">YouTube Shorts / Reels</SelectItem>
                <SelectItem value="reaction">Reaction & Commentary</SelectItem>
              </SelectGroup>

              {/* --- Education & Knowledge --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Education & Knowledge</SelectLabel>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="science">Science & Technology</SelectItem>
                <SelectItem value="business">Business & Finance</SelectItem>
                <SelectItem value="motivation">
                  Motivational & Self-Help
                </SelectItem>
                <SelectItem value="career">Career Guidance</SelectItem>
                <SelectItem value="facts">Interesting Facts</SelectItem>
                <SelectItem value="language">Language Learning</SelectItem>
              </SelectGroup>

              {/* --- Gaming --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Gaming</SelectLabel>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="live">Live Streams</SelectItem>
                <SelectItem value="esports">eSports</SelectItem>
                <SelectItem value="tutorials">Game Tutorials</SelectItem>
                <SelectItem value="reviews">Game Reviews</SelectItem>
              </SelectGroup>

              {/* --- Lifestyle & Fashion --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Lifestyle & Fashion</SelectLabel>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="beauty">Beauty & Makeup</SelectItem>
                <SelectItem value="travel">Travel & Adventure</SelectItem>
                <SelectItem value="food">Food & Cooking</SelectItem>
                <SelectItem value="home">Home & DIY</SelectItem>
              </SelectGroup>

              {/* --- Sports & Fitness --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Sports & Fitness</SelectLabel>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="fitness">Fitness & Gym</SelectItem>
                <SelectItem value="yoga">Yoga & Wellness</SelectItem>
                <SelectItem value="outdoor">Outdoor Activities</SelectItem>
              </SelectGroup>

              {/* --- Tech & Reviews --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Tech & Reviews</SelectLabel>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="gadgets">Gadget Reviews</SelectItem>
                <SelectItem value="coding">Programming & Coding</SelectItem>
                <SelectItem value="ai">AI & Startups</SelectItem>
                <SelectItem value="unboxing">Unboxing</SelectItem>
                <SelectItem value="howto">How-To Tutorials</SelectItem>
              </SelectGroup>

              {/* --- News & Politics --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>News & Politics</SelectLabel>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="current">Current Affairs</SelectItem>
                <SelectItem value="interview">Interviews</SelectItem>
              </SelectGroup>

              {/* --- Art & Creativity --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Art & Creativity</SelectLabel>
                <SelectItem value="art">Art & Design</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="dance">Dance</SelectItem>
                <SelectItem value="craft">Crafts</SelectItem>
                <SelectItem value="music_production">
                  Music Production
                </SelectItem>
              </SelectGroup>

              {/* --- Automotive & Travel --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Automotive & Travel</SelectLabel>
                <SelectItem value="automotive">Cars & Bikes</SelectItem>
                <SelectItem value="racing">Racing</SelectItem>
                <SelectItem value="roadtrip">Road Trips</SelectItem>
                <SelectItem value="exploration">Exploration</SelectItem>
              </SelectGroup>

              {/* --- Others --- */}
              <SelectGroup className="text-neutral-300">
                <SelectLabel>Others</SelectLabel>
                <SelectItem value="pets">Pets & Animals</SelectItem>
                <SelectItem value="nonprofit">Nonprofits & Activism</SelectItem>
                <SelectItem value="memes">Memes</SelectItem>
                <SelectItem value="reviews_general">Product Reviews</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat Section */}
      <div className="relative overflow-hidden">
        {/* Scrollable chat messages */}
        <div className="flex-1 w-full md:h-[82vh] h-[73vh] overflow-y-scroll  flex justify-center">
          <ChatInterface />
        </div>
      </div>
      {/* Input bar */}
      <div className="absolute bottom-28 sm:bottom-2 w-full flex justify-center">
        <div className="bg-neutral-800 sm:shadow-none shadow-sm shadow-gray-400 w-[90%] md:w-[500px] rounded-3xl relative">
          <input
            className="px-5 py-4 outline-none text-sm text-white w-full bg-transparent"
            placeholder="Enter query .."
            type="text"
          />
          <RiSendPlaneFill
            className="absolute cursor-pointer right-5 top-3.5"
            size={25}
            color="white"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
