import { Paper, Typography, Box, List, ListItemButton, ListItemText, Grid, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";

const isOverdue = (task) => {
  if (task.status === "COMPLETED" || !task.dueDate) return false;
  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
};

export default function UrgentTasksPanel({ urgentTasks, onTaskClick }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return { color: "error.main", bg: "error.light" };
      case "MEDIUM":
        return { color: "warning.main", bg: "warning.light" };
      case "LOW":
      default:
        return { color: "success.main", bg: "success.light" };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return { color: "success.main", bg: "success.light" };
      case "IN_PROGRESS":
        return { color: "info.main", bg: "info.light" };
      case "PENDING":
      default:
        return { color: "warning.main", bg: "warning.light" };
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: "text.primary" }}>
        Urgent & Overdue Tasks
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Requires immediate action (overdue or high priority tasks).
      </Typography>

      {urgentTasks.length === 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1, py: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: "success.main", mb: 1.5, opacity: 0.8 }} />
          <Typography variant="body1" fontWeight={600} color="text.primary">
            All caught up!
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            No overdue or high priority pending tasks found.
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1.5, flexGrow: 1 }}>
          {urgentTasks.map((task) => {
            const prioStyle = getPriorityStyle(task.priority);
            const isTaskOverdue = isOverdue(task);
            return (
              <Paper
                key={task.id}
                elevation={0}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderColor: isTaskOverdue ? "error.light" : "divider",
                  backgroundColor: isTaskOverdue ? alpha("#f44336", 0.02) : "background.paper",
                  overflow: "hidden",
                  transition: "background-color 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: isTaskOverdue ? alpha("#f44336", 0.05) : "action.hover",
                  },
                }}
              >
                <ListItemButton onClick={() => onTaskClick(task)} sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Grid container alignItems="center" spacing={1.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <ListItemText
                        primary={task.title}
                        primaryTypographyProps={{
                          fontWeight: 700,
                          variant: "body2",
                          color: "text.primary",
                          sx: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                        }}
                        secondary={
                          <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                            <Chip
                              label={task.priority}
                              size="small"
                              icon={<FlagIcon style={{ fontSize: 12, color: "inherit" }} />}
                              sx={{
                                height: 18,
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                color: prioStyle.color,
                                backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                              }}
                            />
                            {isTaskOverdue && (
                              <Chip
                                label="OVERDUE"
                                size="small"
                                color="error"
                                sx={{ height: 18, fontSize: "0.65rem", fontWeight: 800, borderRadius: "4px" }}
                              />
                            )}
                          </Box>
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }} sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                        <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.75 }} />
                        <Typography variant="caption" fontWeight={600}>
                          {task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Chip
                        label={task.status.replace("_", " ")}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          borderRadius: "6px",
                          ...getStatusStyle(task.status),
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </Paper>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
