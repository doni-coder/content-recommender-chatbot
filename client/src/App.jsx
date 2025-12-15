import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckAuthStatus from "@/utils/CheckAuthStatus.jsx";
import CheckAuthStatusChatPage from "./utils/CheckAuthStatusChatPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CheckAuthStatus />} />
        <Route path="/:chat/:id" element={<CheckAuthStatusChatPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
