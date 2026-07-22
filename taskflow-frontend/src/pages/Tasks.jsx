import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";
import TaskDialog from "../components/TaskDialog";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import TaskDetailsDialog from "../components/TaskDetailsDialog";
import apiClient from "../api/apiClient";
import { toast } from "react-hot-toast";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // Sort State
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");

  // Dialog Control States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Task Details States
  const [detailTask, setDetailTask] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  // Handle Search Debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    let active = true;
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
        if (status) params.status = status;
        if (priority) params.priority = priority;
        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;

        const response = await apiClient.get("/tasks", { params });
        if (active) {
          setTasks(response?.data || []);
   
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load tasks.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchTasks();
    return () => {
      active = false;
    };
  }, [debouncedSearch, status, priority, sortBy, sortOrder, refreshTrigger]);

  const handleAddTaskClick = () => {
    setSelectedTask(null);
    setDialogOpen(true);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleRowClick = (task) => {
    setDetailTask(task);
    setDetailOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const response = await apiClient.delete(`/tasks/${deleteId}`);
      toast.success(response.message || "Task deleted successfully.");
      setDeleteId(null);
      triggerRefresh();
    } catch (err) {
      toast.error(err.message || "Failed to delete task.");
    }
  };

  const handleSortChange = (property, order) => {
    setSortBy(property);
    setSortOrder(order);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant={{ xs: "h5", sm: "h4" }}
          component="h1"
          fontWeight={800}
          letterSpacing="-0.025em"
          color="text.primary"
          sx={{ mb: 1 }}
        >
          Task Management
        </Typography>
        <Typography variant={{ xs: "body2", sm: "body1" }} color="text.secondary">
          Create, edit, filter, and track all your team's tasks in real-time.
        </Typography>
      </Box>

      {/* Filter Component */}
      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        onAddTaskClick={handleAddTaskClick}
      />

      {/* Main Content Area */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskTable
          tasks={tasks}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onRowClick={handleRowClick}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}

      {/* Task Creation & Edit Modal */}
      {dialogOpen && (
        <TaskDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          task={selectedTask}
          onSubmitSuccess={triggerRefresh}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <DeleteConfirmDialog
          open={Boolean(deleteId)}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Task Details Dialog */}
      {detailOpen && (
        <TaskDetailsDialog
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          task={detailTask}
        />
      )}
    </Box>
  );
}
