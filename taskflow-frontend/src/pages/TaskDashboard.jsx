import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Button, Typography, Grid } from "@mui/material";

import apiClient from "../api/apiClient";
import TaskDetailsDialog from "../components/TaskDetailsDialog";
import TaskDialog from "../components/TaskDialog";
import DashboardHeader from "../components/DashboardHeader";
import DashboardMetrics from "../components/DashboardMetrics";
import UrgentTasksPanel from "../components/UrgentTasksPanel";
import StatusDistributionPanel from "../components/StatusDistributionPanel";

// Helper to determine if a task is overdue
const isOverdue = (task) => {
  if (task.status === "COMPLETED" || !task.dueDate) return false;
  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
};

export default function TaskDashboard() {
  const user = useSelector((state) => state.auth.user);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dialog States
  const [detailTask, setDetailTask] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get("/tasks");
      setTasks(response.data || []);
    } catch (err) {
      console.error("Dashboard task fetching failed:", err);
      setError(err.message || "Failed to load dashboard metrics. Please reload.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  // Metrics Calculations
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const overdue = tasks.filter(isOverdue).length;

  // Filter urgent tasks: overdue OR high priority and not completed
  const urgentTasks = tasks
    .filter((t) => t.status !== "COMPLETED" && (isOverdue(t) || t.priority === "HIGH"))
    .slice(0, 5); // Limit to top 5 urgent items

  const handleTaskClick = (task) => {
    setDetailTask(task);
    setDetailOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error" variant="h6" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={fetchTasks}>
          Retry loading
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      {/* Welcome Banner / Header */}
      <DashboardHeader
        userName={user?.name}
        onAddTaskClick={() => setAddOpen(true)}
      />

      {/* Metrics Cards Grid */}
      <DashboardMetrics
        total={total}
        pending={pending}
        inProgress={inProgress}
        completed={completed}
        overdue={overdue}
      />

      {/* Main Breakdown Section */}
      <Grid container spacing={3}>
        {/* Left Column: Urgent Tasks */}
        <Grid size={{ xs: 12, md: 7 }}>
          <UrgentTasksPanel
            urgentTasks={urgentTasks}
            onTaskClick={handleTaskClick}
          />
        </Grid>

        {/* Right Column: Status Breakdown */}
        <Grid size={{ xs: 12, md: 5 }}>
          <StatusDistributionPanel
            total={total}
            pending={pending}
            inProgress={inProgress}
            completed={completed}
            overdue={overdue}
          />
        </Grid>
      </Grid>

      {/* Task Details Dialog */}
      {detailOpen && (
        <TaskDetailsDialog
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          task={detailTask}
        />
      )}

      {/* Add Task Dialog */}
      {addOpen && (
        <TaskDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          task={null}
          onSubmitSuccess={fetchTasks}
        />
      )}
    </Box>
  );
}

