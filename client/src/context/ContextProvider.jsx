import { createContext } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import reducer from "@/context/Reducer.js";

const context = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    isDrawerOpen: false,
    chats: [],
    alertMessage: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export const useProvider = () => {
  return useContext(context);
};

export default ContextProvider;
