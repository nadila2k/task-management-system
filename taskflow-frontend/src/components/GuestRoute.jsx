import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { loginSuccess } from "../store/authSlice";
import { getAccessToken, hasPersistedSession } from "../utils/authStorage";
import { restoreSession } from "../api/apiClient";
import { store } from "../store";
import Login from "../pages/Login";

export default function GuestRoute() {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      const { user } = store.getState().auth;

      if (!hasPersistedSession()) {
        if (active) {
          setShouldRedirect(false);
          setIsChecking(false);
        }
        return;
      }

      if (getAccessToken()) {
        if (user) {
          dispatch(loginSuccess(user));
        }
        if (active) {
          setShouldRedirect(Boolean(user));
          setIsChecking(false);
        }
        return;
      }

      const restored = await restoreSession();
      if (!active) return;

      if (restored && user) {
        dispatch(loginSuccess(user));
        setShouldRedirect(true);
      } else {
        setShouldRedirect(false);
      }

      setIsChecking(false);
    };

    checkSession();

    return () => {
      active = false;
    };
  }, [dispatch]);

  if (isChecking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/task-dashboard" replace />;
  }

  return <Login />;
}
