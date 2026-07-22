import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { hasPersistedSession } from "../utils/authStorage";

const loadPersistedAuthState = () => {
  const raw = localStorage.getItem("authState");
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.isAuthenticated && !hasPersistedSession()) {
      return {
        user: null,
        isAuthenticated: false,
        error: null,
      };
    }
    return parsed;
  } catch {
    return undefined;
  }
};

const persistedAuthState = loadPersistedAuthState();

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
