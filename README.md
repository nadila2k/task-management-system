# TaskFlow - Task Management System

This is a full-stack Task Management System web application created with React (Frontend), Express & Node.js (Backend), and PostgreSQL (Database).

---

## ● Project Overview

TaskFlow is a web application designed to help users manage their daily tasks efficiently. Users can register an account, log in securely, create new tasks, update task details, change task statuses (e.g., Pending, In Progress, Completed), and delete tasks. The project includes role-based user management and automatic initial data seeding for quick testing.

---

## ● Technology Stack

### Frontend
- **Framework & Build Tool:** React 19, Vite
- **UI Components & Styling:** Material-UI (MUI), Emotion, CSS
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing:** React Router DOM (v7)
- **Form Handling & Validation:** Formik, Yup
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

### Backend
- **Runtime Environment:** Node.js (ES Modules `import/export`)
- **Web Framework:** Express.js (v5)
- **ORM & Database:** Sequelize ORM with PostgreSQL (`pg`, `pg-hstore`)
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) with Access & Refresh tokens
- **Password Hashing:** `bcrypt`
- **Request Validation:** Zod
- **API Documentation:** Swagger UI (`swagger-ui-express`)

### Containerization & Deployment
- **Docker & Docker Compose:** Multi-stage Docker builds for backend and frontend with PostgreSQL container.
- **Web Server:** Nginx (serving production frontend build).

---

## ● Installation Instructions

### Prerequisites
Make sure you have the following installed on your computer:
1. **Node.js** (v18.x or higher) and **npm**
2. **PostgreSQL** database server (or **Docker Desktop**)
3. **Git**

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd task-management-system
```

### Step 2: Install Backend Dependencies
```bash
cd taskflow-backend
npm install
cd ..
```

### Step 3: Install Frontend Dependencies
```bash
cd taskflow-frontend
npm install
cd ..
```

---

## ● Environment Variables

### Backend Configuration (`taskflow-backend/.env`)
Create a `.env` file in the `taskflow-backend` folder with the following variables:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskflow_db

JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Frontend Configuration (`taskflow-frontend/.env`)
Create a `.env` file in the `taskflow-frontend` folder with the following variable:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## ● Database Setup

### Option 1: Automatic Schema Migration (Recommended)
1. Ensure PostgreSQL is running on your machine.
2. Create a database named `taskflow_db`:
   ```sql
   CREATE DATABASE taskflow_db;
   ```
3. When you start the backend server, Sequelize automatically creates all tables (`users`, `tasks`) and seeds default initial data (`admin@test.com` & sample tasks).

### Option 2: Manual SQL Dump Import (`schema.sql`)
You can manually import the provided SQL schema dump file [`schema.sql`](task-management-system/schema.sql) directly into PostgreSQL:

```bash
psql -U postgres -d taskflow_db -f schema.sql
```
*(Or import `taskflow-backend/database/schema.sql` via pgAdmin Query Tool).*

---

## ● Running the Backend

### Option A: Running locally with Node.js
```bash
cd taskflow-backend
npm run dev
```
The backend server will start at `http://localhost:5000`.

### Option B: Running with Docker Compose
From the root directory of the project:
```bash
docker compose up --build -d
```

---

## ● Running the Frontend

### Option A: Running locally with Vite
```bash
cd taskflow-frontend
npm run dev
```
The frontend development server will start at `http://localhost:5173`. Open your browser and navigate to `http://localhost:5173`.

### Option B: Running with Docker Compose
When running via Docker Compose (`docker compose up --build -d`), Nginx serves the compiled frontend on port `3000`:
- Open your browser and navigate to `http://localhost:3000`.

---

## ● API Documentation

Interactive Swagger API documentation is integrated into the backend server.

- **URL:** `http://localhost:5000/api-docs`
- **Features:** You can test API endpoints (Authentication, Task Management, User Profile) directly from the browser interface.

---

## ● Assumptions Made

1. **Automatic Database Seeding:** It is assumed that default admin credentials and sample task data should be created on initial server startup for easy testing.
2. **Browser Environment:** It is assumed that users will access the application using modern web browsers (Chrome, Firefox, Edge, Safari).
3. **JWT Storage:** Access tokens are stored securely in client state/headers, and refresh tokens are used for session renewal.

---

## ● Known Limitations (if any)

1. **Port 5432 Host Conflict:** If PostgreSQL is already running locally on port `5432`, running Docker Compose without changing the port mapping can cause a port conflict. (In `docker-compose.yml`, the host port is mapped to `5433:5432` to avoid this issue).
2. **Offline Font Loading:** Frontend relies on Google Fonts (`Inter`), so an active internet connection is required for ideal typography rendering when running locally.
