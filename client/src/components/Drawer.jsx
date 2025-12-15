import React, { useState } from "react";
import "@/css/Drawer.css";
import { UserButton } from "@clerk/clerk-react";
import { useProvider } from "@/context/ContextProvider";
import { IoCreateOutline } from "react-icons/io5";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

function Drawer() {
  const { state, dispatch } = useProvider();
  const [chat, setChat] = useState(null);

  const handleAddNewChat = () => {
    dispatch({ type: "setChatRecord", payload: { title: chat } });
  };

  return (
    <>
      <div
        className={`drawer-overlay ${state.isDrawerOpen ? "show" : ""}`}
      ></div>

      {/* open dialoge */}

      {/* Drawer panel */}
      <div className={`drawer relative ${state.isDrawerOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => dispatch({ type: "setDrawer", payload: false })}
        >
          ✕
        </button>
        <h2>Menu</h2>

        {/* create new chat */}

        <Dialog>
          <DialogTrigger className={"w-full"}>
            <div className="bg-neutral-800 px-5 hover:bg-neutral-700 mt-10 flex items-center gap-1  w-full py-2 cursor-pointer rounded-xl">
              <IoCreateOutline />
              <span className="text-[14px]">new chat</span>
            </div>
          </DialogTrigger>
          <DialogContent
            className={
              "z-9999 bg-neutral-800/40 backdrop-blur-sm border border-white/10"
            }
          >
            <DialogHeader>
              <DialogTitle className={"text-xl text-white font-bold"}>
                Chat name
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex flex-col">
                  <input
                    onChange={(e) => setChat(e.target.value)}
                    className=" py-1.5 px-4 text-neutral-300 rounded-md outline-1 outline-neutral-300"
                    type="text"
                    target={chat}
                  />
                  <DialogClose asChild>
                    <button
                      onClick={handleAddNewChat}
                      className="px-4 py-2 mt-3 rounded-md cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/20 backdrop-blur-md transition-all duration-200"
                    >
                      Confirm
                    </button>
                  </DialogClose>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Chat History section */}
        <div className="mt-6">
          <h4 className="text-[13px] text-neutral-400">Chats</h4>
        </div>
        {state.chats?.length > 0 ? (
          <ul>
            {state.chats?.map((chat, index) => {
              return (
                <Link
                  key={index}
                  to={`/${chat.title}/1`}
                  className="text-[14px] li block text-neutral-300"
                >
                  {chat.title.length < 25
                    ? chat.title
                    : chat.title.slice(0, 25) + " ..."}
                </Link>
              );
            })}
          </ul>
        ) : (
          <span className="text-[12px] text-neutral-400 mt-3">
            No chats available!
          </span>
        )}

        {/* Account section  */}
        <div className=" w-full flex items-center px-5 gap-2 py-3 absolute left-0 bottom-0 bg-neutral-800">
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "28px",
                  height: "28px",
                },
              },
            }}
          />
          <span className="text-[14px] select-none text-neutral-400">
            My Account
          </span>
        </div>
      </div>
    </>
  );
}

export default Drawer;
