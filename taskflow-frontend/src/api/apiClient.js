import axios from "axios";

// Helper to get a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Helper to delete a cookie by name
const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});


apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token") || getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
 
    return response.data;
  },
  (error) => {
    let status = "error";
    let message = "Something went wrong";
    let errors = null;

    if (error.response) {
      
      const backendPayload = error.response.data;

     
      status = backendPayload?.status || status;
      message = backendPayload?.message || error.message || message;
      errors = backendPayload?.data || null;

  
      if (error.response.status === 401) {
        deleteCookie("token");
        deleteCookie("accessToken");
      
      }
    } else if (error.request) {

      status = "error";
      message = "Network error. Please check your internet connection.";
    } else {
    
      status = "error";
      message = error.message;
    }

 
    return Promise.reject({
      status,
      message,
      data: errors,
      originalError: error,
    });
  }
);

export default apiClient;
