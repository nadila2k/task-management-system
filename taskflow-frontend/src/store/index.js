import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Load persisted authentication state from localStorage if it exists
const persistedAuthState = localStorage.getItem("authState")
  ? JSON.parse(localStorage.getItem("authState"))
  : undefined;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedAuthState ? { auth: persistedAuthState } : undefined,
});

// Automatically save auth state to localStorage when changes occur
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("authState", JSON.stringify(state.auth));
});
