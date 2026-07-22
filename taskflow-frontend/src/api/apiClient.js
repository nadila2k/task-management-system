import axios from "axios";
import { store } from "../store";
import { logout } from "../store/authSlice";
import {
  getAccessToken,
  getRefreshToken,
  persistAuthSession,
  clearAuthSession,
} from "../utils/authStorage";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const refreshClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  refreshQueue = [];
};

const formatError = (error) => {
  let status = "error";
  let message = "Something went wrong";
  let errors = null;

  if (error.response) {
    const backendPayload = error.response.data;
    status = backendPayload?.status || status;
    message = backendPayload?.message || error.message || message;
    errors = backendPayload?.data || null;
  } else if (error.request) {
    status = "error";
    message = "Network error. Please check your internet connection.";
  } else {
    status = "error";
    message = error.message;
  }

  return {
    status,
    message,
    data: errors,
    originalError: error,
  };
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(formatError(error))
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      const requestUrl = originalRequest.url || "";
      const isAuthEndpoint =
        requestUrl.includes("/auth/login") || requestUrl.includes("/auth/refresh");

      if (isAuthEndpoint) {
        return Promise.reject(formatError(error));
      }

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearAuthSession();
        store.dispatch(logout());
        return Promise.reject(formatError(error));
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((queueError) => Promise.reject(formatError(queueError)));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await refreshClient.post("/auth/refresh", { refreshToken });
        const tokens = data?.data;

        if (!tokens?.accessToken) {
          throw new Error("Invalid refresh response from server.");
        }

        persistAuthSession(tokens);
        processQueue(null, tokens.accessToken);
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthSession();
        store.dispatch(logout());
        return Promise.reject(formatError(refreshError));
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 401) {
      clearAuthSession();
      store.dispatch(logout());
    }

    return Promise.reject(formatError(error));
  }
);

export async function restoreSession() {
  if (getAccessToken()) {
    return true;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  try {
    const { data } = await refreshClient.post("/auth/refresh", { refreshToken });
    const tokens = data?.data;

    if (!tokens?.accessToken) {
      throw new Error("Invalid refresh response from server.");
    }

    persistAuthSession(tokens);
    return true;
  } catch {
    clearAuthSession();
    store.dispatch(logout());
    return false;
  }
}

export default apiClient;
