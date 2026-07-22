import NotFound from "../pages/NotFound";
import TaskDashboard from "../pages/TaskDashboard";
import Tasks from "../pages/Tasks";

import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import TaskDashboardLayout from "../components/TaskDashboardLayout";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/task-dashboard" replace />,
  },
  {
    path: "/login",
    element: <GuestRoute />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "task-dashboard",
        element: <TaskDashboardLayout />,
        children: [
          { index: true, element: <TaskDashboard /> },
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
