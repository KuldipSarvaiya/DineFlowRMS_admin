import React, { createContext, useReducer } from "react";

export const context = createContext();

function AppState({ children }) {
  const initialState = {
    auth: false,
  };
  function reducerFunction(state, action) {
    console.log("\n*******ReducerFunction = ", action, state);
    const { type, payload } = action;
    switch (type) {
      case "setAuth":
        return { ...state, auth: payload };
      default:
        return state;
    }
  }
  const [appData, Dispatch] = useReducer(reducerFunction, initialState);
  return (
    <context.Provider value={{ appData, Dispatch }}>
      {children}
    </context.Provider>
  );
}

export default AppState;
