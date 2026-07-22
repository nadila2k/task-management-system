import { Box, IconButton, Typography, Container } from "@mui/material";
import * as Yup from "yup";
import ReusableForm from "../components/ReusableForm";
import { useColorMode } from "../theme/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import apiClient from "../api/apiClient";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { mode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "text",
      placeholder: "name@company.com",
      required: true,
      grid: { xs: 12 },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      required: true,
      grid: { xs: 12 },
    },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await apiClient.post("/auth/login", values);
      
    
      if (response?.data?.accessToken) {
        document.cookie = `token=${response.data.accessToken}; path=/; max-age=900; SameSite=Lax;`;
      }
      if (response?.data?.refreshToken) {
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=604800; SameSite=Lax;`;
      }

    
      if (response?.data?.user) {
        dispatch(loginSuccess(response.data.user));
      } else {
        dispatch(loginSuccess({ name: "Demo User", email: values.email }));
      }

      toast.success(response.message || "Welcome back! Login successful.");
      
      // Redirect to the dashboard page
      navigate("/task-dashboard");
    } catch (err) {
      toast.error(err.message || "Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        overflow: "hidden",
        "&::before": {
          content: '""',
          display: "block",
          position: "absolute",
          zIndex: -1,
          inset: 0,
          backgroundColor: mode === "light" ? "#f8fafc" : "#0b0f19",
          backgroundImage:
            mode === "light"
              ? "radial-gradient(ellipse at 50% 50%, #ebf5ff, #ffffff)"
              : "radial-gradient(ellipse at 50% 50%, #0f172a, #020617)",
          backgroundRepeat: "no-repeat",
        },
      }}
    >
      {/* Theme Toggle Button positioned at top-right */}
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(4px)",
          backgroundColor: mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(17, 24, 39, 0.8)",
          "&:hover": {
            backgroundColor: mode === "light" ? "rgba(241, 245, 249, 1)" : "rgba(31, 41, 55, 1)",
          },
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Container maxWidth="xs">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "primary.main",
              mb: 1,
            }}
          >
            TaskFlow
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage your tasks efficiently
          </Typography>
        </Box>

        <ReusableForm
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
          fields={fields}
          submitText="Sign In"
          withPaper={true}
          paperTitle="Welcome Back"
        />
      </Container>
    </Box>
  );
}
