import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const formatCurrentDate = () => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

export default function DashboardHeader({ userName, onAddTaskClick }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.025em", color: "text.primary" }}>
          Welcome back, {userName || "Admin"}!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
          {formatCurrentDate()} — Here is your dashboard summary.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/task-dashboard/tasks")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 2.5,
            py: 1,
          }}
        >
          Manage Tasks
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddTaskClick}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 2.5,
            py: 1,
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
          }}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
