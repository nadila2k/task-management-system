import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { CustomColorModeProvider } from "./theme/ThemeContext";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(routes);

export default function App() {
  return (
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
  );
}
