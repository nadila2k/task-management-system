import Task from "../models/Task.js";
import { TaskPriority } from "../enum/priority.enum.js";
import { TaskStatus } from "../enum/status.enum.js";

export const seedTasks = async () => {
  try {
    const existingTasks = await Task.count();

    if (existingTasks === 0) {
      await Task.bulkCreate([
        {
          title: "Design login page UI",
          description: "Create responsive login page using Material UI components.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.IN_PROGRESS,
          dueDate: "2026-07-25",
        },
        {
          title: "Implement JWT authentication",
          description: "Develop access token and refresh token authentication flow.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.COMPLETED,
          dueDate: "2026-07-20",
        },
        {
          title: "Create database schema",
          description: "Design database tables and relationships.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.COMPLETED,
          dueDate: "2026-07-18",
        },
        {
          title: "Build task creation API",
          description: "Implement REST API endpoint for creating tasks.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.IN_PROGRESS,
          dueDate: "2026-07-27",
        },
        {
          title: "Add task filtering",
          description: "Filter tasks by status and priority.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-01",
        },
        {
          title: "Implement pagination",
          description: "Add pagination support for task listing.",
          priority: TaskPriority.LOW,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-05",
        },
        {
          title: "Create dashboard UI",
          description: "Develop dashboard page with task statistics.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.IN_PROGRESS,
          dueDate: "2026-07-30",
        },
        {
          title: "Write API documentation",
          description: "Document backend APIs using Swagger.",
          priority: TaskPriority.LOW,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-10",
        },
        {
          title: "Setup project structure",
          description: "Organize backend folder structure.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.COMPLETED,
          dueDate: "2026-07-15",
        },
        {
          title: "Implement error handling",
          description: "Create centralized error handling middleware.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.IN_PROGRESS,
          dueDate: "2026-07-28",
        },
        {
          title: "Add input validation",
          description: "Validate API request payloads.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-03",
        },
        {
          title: "Deploy backend server",
          description: "Deploy Node.js API server.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-15",
        },
        {
          title: "Configure environment variables",
          description: "Setup development and production configs.",
          priority: TaskPriority.LOW,
          status: TaskStatus.COMPLETED,
          dueDate: "2026-07-12",
        },
        {
          title: "Test authentication API",
          description: "Test login and registration endpoints.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.COMPLETED,
          dueDate: "2026-07-22",
        },
        {
          title: "Optimize database queries",
          description: "Improve Sequelize database performance.",
          priority: TaskPriority.LOW,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-20",
        },
        {
          title: "Create task update API",
          description: "Implement update task endpoint.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.IN_PROGRESS,
          dueDate: "2026-07-29",
        },
        {
          title: "Create task delete API",
          description: "Implement delete task endpoint.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-07",
        },
        {
          title: "Add frontend integration",
          description: "Connect React frontend with backend APIs.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.IN_PROGRESS,
          dueDate: "2026-08-12",
        },
        {
          title: "Perform final testing",
          description: "Test complete task management system.",
          priority: TaskPriority.HIGH,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-25",
        },
        {
          title: "Project deployment",
          description: "Deploy complete application to production.",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          dueDate: "2026-08-30",
        },
      ]);

      console.log("Default tasks created successfully");
    } else {
      console.log("Tasks already exist");
    }
  } catch (error) {
    console.error("Failed to seed tasks:", error);
  }
};