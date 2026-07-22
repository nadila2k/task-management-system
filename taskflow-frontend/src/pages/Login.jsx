import { Box, IconButton, Typography, Container, Paper } from "@mui/material";
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
import { persistAuthSession } from "../utils/authStorage";

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
      type: "email",
      placeholder: "name@company.com",
      required: true,
      size: "medium",
      grid: { xs: 12 },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      required: true,
      size: "medium",
      grid: { xs: 12 },
    },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await apiClient.post("/auth/login", values);
      const session = response?.data;

      if (!session?.accessToken || !session?.user) {
        throw new Error("Invalid login response from server.");
      }

      persistAuthSession(session);
      dispatch(loginSuccess(session.user));

      toast.success(response.message || "Welcome back! Login successful.");
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
        py: { xs: 3, sm: 4 },
        px: 2,
        overflow: "hidden",
        backgroundColor: mode === "light" ? "#f8fafc" : "#0b0f19",
        backgroundImage:
          mode === "light"
            ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(25, 118, 210, 0.12), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(25, 118, 210, 0.06), transparent)"
            : "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59, 130, 246, 0.18), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(59, 130, 246, 0.08), transparent)",
      }}
    >
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        aria-label="Toggle theme"
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(8px)",
          backgroundColor:
            mode === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(17, 24, 39, 0.85)",
          "&:hover": {
            backgroundColor:
              mode === "light" ? "rgba(241, 245, 249, 1)" : "rgba(31, 41, 55, 1)",
          },
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Container maxWidth="xs" disableGutters sx={{ width: "100%" }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            boxShadow:
              mode === "light"
                ? "0 8px 32px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)"
                : "0 8px 32px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: "primary.main",
                mb: 0.75,
              }}
            >
              TaskFlow
            </Typography>
            <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
              Welcome back
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
            withPaper={false}
            submitFullWidth
          />
        </Paper>
      </Container>
    </Box>
  );
}
