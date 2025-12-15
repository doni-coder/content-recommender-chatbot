import React, { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";
import { CgMenuLeft } from "react-icons/cg";
import { useProvider } from "@/context/ContextProvider";
import "@/css/Scrollbar.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const { state, dispatch } = useProvider();
  const [chatName, setChatName] = useState();
  const navigate = useNavigate();

  const handleCreateNewChat = () => {
    const chatExists = state.chats?.some(
      (chat) => chat.title?.toLowerCase() === chatName?.toLowerCase()
    );

    if (chatExists) {
      toast.warning("Chat already exists!");
      return;
    }

    dispatch({ type: "setChatRecord", payload: { title: chatName } });
  };

  useEffect(() => {
    if (state.alertMessage) {
      toast(state.alertMessage);
      dispatch({ type: "setAlertMessage", payload: "" });
    }
  }, [state.alertMessage]);

  return (
    <div className="relative bg-neutral-900 w-full h-screen">
      <div className="z-4000">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Slide}
        />
      </div>
      <Drawer />
      <div className="px-8 py-2.5 w-full flex justify-between border-b border-neutral-800">
        <div>
          <CgMenuLeft
            onClick={() => dispatch({ type: "setDrawer", payload: true })}
            size={25}
            className="cursor-pointer"
            color="white"
          />
        </div>
        <div></div>
      </div>
      <div className=" flex w-full h-[90vh] items-center justify-center">
        <div className="w-[300px] h-fit rounded-xl px-4 py-6 bg-neutral-800">
          <h2 className="text-neutral-300 font-sans text-2xl text-center">
            Name your idea?
          </h2>
          <div className="flex mt-4 flex-col">
            <label htmlFor="chatname" className="text-neutral-500">
              Enter chat name:
            </label>
            <input
              id="chatname"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className=" border mt-1 py-1 text-neutral-300 outline-none px-3 rounded-sm border-neutral-400"
              type="text"
            />
            <button
              onClick={handleCreateNewChat}
              className="px-4 py-1 mt-3 rounded-md cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/20 backdrop-blur-md transition-all duration-200"
            >
              create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
