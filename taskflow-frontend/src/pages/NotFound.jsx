import { Box, Typography, Button, Container, Paper, Stack, keyframes, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";

// Keyframe animations for subtle float and glow
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { opacity: 0.4; transform: scale(0.98); }
  50% { opacity: 0.8; transform: scale(1.02); }
  100% { opacity: 0.4; transform: scale(0.98); }
`;

export default function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
        py: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient glow effect */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 280, sm: 450 },
          height: { xs: 280, sm: 450 },
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.05) 60%, transparent 70%)"
            : "radial-gradient(circle, rgba(25, 118, 210, 0.12) 0%, rgba(156, 39, 176, 0.04) 60%, transparent 70%)",
          filter: "blur(40px)",
          animation: `${pulseGlow} 6s infinite ease-in-out`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            borderRadius: 4,
            bgcolor: isDark ? "rgba(17, 24, 39, 0.7)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
            boxShadow: isDark
              ? "0 20px 40px rgba(0, 0, 0, 0.5)"
              : "0 20px 40px rgba(15, 23, 42, 0.06)",
          }}
        >
          {/* Animated Graphic Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: "50%",
              bgcolor: isDark ? "rgba(59, 130, 246, 0.12)" : "rgba(25, 118, 210, 0.08)",
              color: "primary.main",
              mb: 3,
              animation: `${floatAnimation} 4s ease-in-out infinite`,
              border: "1px solid",
              borderColor: isDark ? "rgba(59, 130, 246, 0.25)" : "rgba(25, 118, 210, 0.15)",
            }}
          >
            <SearchOffRoundedIcon sx={{ fontSize: 48 }} />
          </Box>

          {/* 404 Gradient Text */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4.5rem", sm: "6rem" },
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              background: isDark
                ? "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)"
                : "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.01em",
              mb: 1.5,
              color: "text.primary",
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 440,
              mx: "auto",
              mb: 4,
              lineHeight: 1.6,
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            The page you are looking for doesn't exist, was removed, or might be temporarily unavailable.
          </Typography>

          {/* Horizontally Centered Action Button Wrapper */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(-1)}
              sx={{
                py: 1.2,
                px: 4,
                fontWeight: 600,
                borderRadius: 2.5,
                boxShadow: isDark
                  ? "0 4px 14px rgba(59, 130, 246, 0.4)"
                  : "0 4px 14px rgba(25, 118, 210, 0.3)",
              }}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}