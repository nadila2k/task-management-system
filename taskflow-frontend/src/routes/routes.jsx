import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import TaskDashboard from "../pages/TaskDashboard";
import Tasks from "../pages/Tasks";
import TaskStats from "../pages/TaskStats";

export const routes = [

    {
        path: '/login',
        element: <Login />
    },
    {
        path: "task-dashboard",
        element: (
        
            <TaskDashboard />
     
        ),
        children: [
          { index: true, element: <TaskDashboard /> },
          { path: "task-stats", element: <TaskStats /> },
          { path: "tasks", element: <Tasks /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      }
]