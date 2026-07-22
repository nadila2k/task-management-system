
DROP TABLE IF EXISTS "tasks";
DROP TABLE IF EXISTS "users";
DROP TYPE IF EXISTS "enum_tasks_priority";
DROP TYPE IF EXISTS "enum_tasks_status";


CREATE TYPE "enum_tasks_priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "enum_tasks_status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- Create Users Table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "refresh_token" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Tasks Table
CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "priority" "enum_tasks_priority" NOT NULL DEFAULT 'MEDIUM',
  "status" "enum_tasks_status" NOT NULL DEFAULT 'PENDING',
  "due_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Admin User (Email: admin@test.com, Password: 123456)
INSERT INTO "users" ("name", "email", "password", "created_at", "updated_at")
VALUES (
  'Admin',
  'admin@test.com',
  '$2b$10$7Z2G17R3q1u3H0U1q0U1quP0H0U1q0U1quP0H0U1q0U1quP0H0U1q',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Seed Initial Sample Tasks Data
INSERT INTO "tasks" ("title", "description", "priority", "status", "due_date", "created_at", "updated_at") VALUES
('Design login page UI', 'Create responsive login page using Material UI components.', 'HIGH', 'IN_PROGRESS', '2026-07-25 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Implement JWT authentication', 'Develop access token and refresh token authentication flow.', 'HIGH', 'COMPLETED', '2026-07-20 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Create database schema', 'Design database tables and relationships.', 'MEDIUM', 'COMPLETED', '2026-07-18 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Build task creation API', 'Implement REST API endpoint for creating tasks.', 'HIGH', 'IN_PROGRESS', '2026-07-27 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Add task filtering', 'Filter tasks by status and priority.', 'MEDIUM', 'PENDING', '2026-08-01 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Implement pagination', 'Add pagination support for task listing.', 'LOW', 'PENDING', '2026-08-05 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Create dashboard UI', 'Develop dashboard page with task statistics.', 'MEDIUM', 'IN_PROGRESS', '2026-07-30 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Write API documentation', 'Document backend APIs using Swagger.', 'LOW', 'PENDING', '2026-08-10 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Setup project structure', 'Organize backend folder structure.', 'HIGH', 'COMPLETED', '2026-07-15 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Implement error handling', 'Create centralized error handling middleware.', 'MEDIUM', 'IN_PROGRESS', '2026-07-28 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Add input validation', 'Validate API request payloads.', 'MEDIUM', 'PENDING', '2026-08-03 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Deploy backend server', 'Deploy Node.js API server.', 'HIGH', 'PENDING', '2026-08-15 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Configure environment variables', 'Setup development and production configs.', 'LOW', 'COMPLETED', '2026-07-12 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Test authentication API', 'Test login and registration endpoints.', 'MEDIUM', 'COMPLETED', '2026-07-22 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Optimize database queries', 'Improve Sequelize database performance.', 'LOW', 'PENDING', '2026-08-20 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Create task update API', 'Implement update task endpoint.', 'HIGH', 'IN_PROGRESS', '2026-07-29 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Create task delete API', 'Implement delete task endpoint.', 'MEDIUM', 'PENDING', '2026-08-07 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Add frontend integration', 'Connect React frontend with backend APIs.', 'HIGH', 'IN_PROGRESS', '2026-08-12 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Perform final testing', 'Test complete task management system.', 'HIGH', 'PENDING', '2026-08-25 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Project deployment', 'Deploy complete application to production.', 'MEDIUM', 'PENDING', '2026-08-30 00:00:00+00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
