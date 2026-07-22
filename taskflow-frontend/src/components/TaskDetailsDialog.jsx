import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import FlagIcon from "@mui/icons-material/Flag";

export default function TaskDetailsDialog({ open, onClose, task }) {
  if (!task) return null;

  // Helper to format priority color palette
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return { color: "#991b1b", backgroundColor: "#ffe4e6" };
      case "MEDIUM":
        return { color: "#854d0e", backgroundColor: "#fef9c3" };
      case "LOW":
      default:
        return { color: "#166534", backgroundColor: "#f0fdf4" };
    }
  };

  // Helper to format status color palette
  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return { color: "#15803d", backgroundColor: "#dcfce7" };
      case "IN_PROGRESS":
        return { color: "#1d4ed8", backgroundColor: "#dbeafe" };
      case "PENDING":
      default:
        return { color: "#b45309", backgroundColor: "#fef3c7" };
    }
  };

  const formatStatusText = (status) => {
    if (!status) return "";
    return status.replace("_", " ");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          Task Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
            Title
          </Typography>
          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ mt: 0.5 }}>
            {task.title}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, whiteSpace: "pre-wrap" }}>
            {task.description || "No description provided."}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" sx={{ mb: 1 }}>
                Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InfoIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Chip
                  label={formatStatusText(task.status)}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    ...getStatusStyle(task.status),
                    borderRadius: "6px",
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" sx={{ mb: 1 }}>
                Priority
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FlagIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Chip
                  label={task.priority}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    ...getPriorityStyle(task.priority),
                    borderRadius: "6px",
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" sx={{ mb: 1 }}>
                Due Date
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "-"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
