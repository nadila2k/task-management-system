import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useEffect } from "react";

// Helper to get a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export default function ProtectedRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const hasToken = Boolean(getCookie("token") || getCookie("accessToken"));

  useEffect(() => {
    if (isAuthenticated && !hasToken) {
      dispatch(logout());
    }
  }, [isAuthenticated, hasToken, dispatch]);

  if (!isAuthenticated || !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
