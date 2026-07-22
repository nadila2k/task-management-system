import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import TaskDashboard from "../pages/TaskDashboard";
import Tasks from "../pages/Tasks";
import TaskStats from "../pages/TaskStats";
import ProtectedRoute from "../components/ProtectedRoute";
import TaskDashboardLayout from "../components/TaskDashboardLayout";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "task-dashboard",
        element: <TaskDashboardLayout />,
        children: [
          { index: true, element: <TaskDashboard /> },
          { path: "task-stats", element: <TaskStats /> },
          { path: "tasks", element: <Tasks /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
