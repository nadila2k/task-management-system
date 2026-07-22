import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";


const persistedAuthState = localStorage.getItem("authState")
  ? JSON.parse(localStorage.getItem("authState"))
  : undefined;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedAuthState ? { auth: persistedAuthState } : undefined,
});


store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("authState", JSON.stringify(state.auth));
});
