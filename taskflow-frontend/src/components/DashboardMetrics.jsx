import { Grid, Paper, Box, Typography, LinearProgress } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function DashboardMetrics({ total, pending, inProgress, completed, overdue }) {
  const navigate = useNavigate();

  const getPercentage = (value) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const metricConfigs = [
    {
      title: "Total Tasks",
      value: total,
      percentage: 100,
      color: "#3f51b5", // Indigo
      icon: <AssignmentIcon />,
      subtitle: "All registered tasks",
    },
    {
      title: "Pending Tasks",
      value: pending,
      percentage: getPercentage(pending),
      color: "#ff9800", // Amber
      icon: <HourglassEmptyIcon />,
      subtitle: "Awaiting execution",
    },
    {
      title: "In Progress",
      value: inProgress,
      percentage: getPercentage(inProgress),
      color: "#03a9f4", // Light Blue
      icon: <PlayArrowIcon />,
      subtitle: "Currently active",
    },
    {
      title: "Completed",
      value: completed,
      percentage: getPercentage(completed),
      color: "#4caf50", // Green
      icon: <CheckCircleIcon />,
      subtitle: "Successfully finished",
    },
    {
      title: "Overdue Tasks",
      value: overdue,
      percentage: getPercentage(overdue),
      color: "#f44336", // Red
      icon: <ErrorIcon />,
      subtitle: "Passed due dates",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {metricConfigs.map((metric) => (
        <Grid key={metric.title} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(0, 0, 0, 0.5)"
                    : "0 8px 24px rgba(149, 157, 165, 0.15)",
              },
            }}
            onClick={() => navigate("/task-dashboard/tasks")}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing="0.05em">
                  {metric.title}
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 1, color: "text.primary", lineHeight: 1 }}>
                  {metric.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  backgroundColor: alpha(metric.color, 0.1),
                  color: metric.color,
                }}
              >
                {metric.icon}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, fontWeight: 500 }}>
              {metric.subtitle}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LinearProgress
                variant="determinate"
                value={metric.percentage}
                sx={{
                  flexGrow: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: metric.color,
                    borderRadius: 3,
                  },
                }}
              />
              <Typography variant="caption" fontWeight={700} sx={{ color: metric.color, minWidth: 28, textAlign: "right" }}>
                {metric.percentage}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
