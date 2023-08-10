// src/GlobalStateContext.js
import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  posts: [],
  likes: [],
  // add other state properties as needed
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    // add other cases as your app grows
    default:
      return state;
  }
};

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
