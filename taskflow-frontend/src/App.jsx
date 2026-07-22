import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { CustomColorModeProvider } from "./theme/ThemeContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <CustomColorModeProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              fontFamily: "Inter, sans-serif",
              borderRadius: "10px",
              fontSize: "0.875rem",
            }
          }}
        />
      </CustomColorModeProvider>
    </Provider>
  );
}
