const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "TaskFlow API",
    version: "1.0.0",
    description:
      "REST API for TaskFlow task management. Authenticate via `/auth/login`, then use the access token as a Bearer token for protected routes.",
    contact: {
      name: "TaskFlow",
    },
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "Tasks", description: "Task management endpoints (requires authentication)" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT access token from login or refresh",
      },
    },
    schemas: {
      ApiSuccessResponse: {
        type: "object",
        properties: {
          status: { type: "string", example: "success" },
          message: { type: "string", example: "Operation successful" },
          data: { nullable: true },
        },
      },
      ApiErrorResponse: {
        type: "object",
        properties: {
          status: { type: "string", example: "fail" },
          message: { type: "string", example: "Validation failed" },
          data: { nullable: true },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Admin" },
          email: { type: "string", format: "email", example: "admin@test.com" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "admin@test.com" },
          password: { type: "string", format: "password", example: "123456" },
        },
      },
      LoginResponseData: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/User" },
          accessToken: { type: "string", description: "JWT access token (expires in 15m)" },
          refreshToken: { type: "string", description: "JWT refresh token (expires in 7d)" },
        },
      },
      RefreshTokenRequest: {
        type: "object",
        required: ["refreshToken"],
        properties: {
          refreshToken: { type: "string" },
        },
      },
      TokenPair: {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
        },
      },
      LogoutRequest: {
        type: "object",
        properties: {
          refreshToken: { type: "string" },
        },
      },
      TaskPriority: {
        type: "string",
        enum: ["LOW", "MEDIUM", "HIGH"],
        example: "MEDIUM",
      },
      TaskStatus: {
        type: "string",
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
        example: "PENDING",
      },
      Task: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Design login page UI" },
          description: { type: "string", nullable: true, example: "Create responsive login page" },
          priority: { $ref: "#/components/schemas/TaskPriority" },
          status: { $ref: "#/components/schemas/TaskStatus" },
          dueDate: { type: "string", format: "date-time", example: "2026-07-25T00:00:00.000Z" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CreateTaskRequest: {
        type: "object",
        required: ["title", "priority", "status", "dueDate"],
        properties: {
          title: { type: "string", example: "New task" },
          description: { type: "string", nullable: true, example: "Task details" },
          priority: { $ref: "#/components/schemas/TaskPriority" },
          status: { $ref: "#/components/schemas/TaskStatus" },
          dueDate: { type: "string", format: "date", example: "2026-07-25" },
        },
      },
      UpdateTaskRequest: {
        type: "object",
        properties: {
          title: { type: "string", example: "Updated task title" },
          description: { type: "string", nullable: true },
          priority: { $ref: "#/components/schemas/TaskPriority" },
          status: { $ref: "#/components/schemas/TaskStatus" },
          dueDate: { type: "string", format: "date", example: "2026-07-30" },
        },
      },
    },
  },
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        description: "Authenticate with email and password. Returns user info and JWT tokens.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Login successful" },
                        data: { $ref: "#/components/schemas/LoginResponseData" },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refresh tokens",
        description: "Exchange a valid refresh token for a new access/refresh token pair.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RefreshTokenRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Tokens refreshed successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Tokens refreshed successfully" },
                        data: { $ref: "#/components/schemas/TokenPair" },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: "Invalid or expired refresh token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout",
        description: "Invalidate the refresh token on the server.",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LogoutRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Logged out successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Logged out successfully" },
                        data: { nullable: true, example: null },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List tasks",
        description: "Retrieve tasks with optional search, filter, and sort.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search by task title",
          },
          {
            name: "status",
            in: "query",
            schema: { $ref: "#/components/schemas/TaskStatus" },
            description: "Filter by status",
          },
          {
            name: "priority",
            in: "query",
            schema: { $ref: "#/components/schemas/TaskPriority" },
            description: "Filter by priority",
          },
          {
            name: "sortBy",
            in: "query",
            schema: { type: "string", enum: ["title", "dueDate", "createdAt"] },
            description: "Sort field",
          },
          {
            name: "sortOrder",
            in: "query",
            schema: { type: "string", enum: ["ASC", "DESC"] },
            description: "Sort direction",
          },
        ],
        responses: {
          200: {
            description: "Tasks retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Tasks retrieved successfully" },
                        data: {
                          type: "array",
                          items: { $ref: "#/components/schemas/Task" },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create task",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateTaskRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Task created successfully" },
                        data: { $ref: "#/components/schemas/Task" },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Get task by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Task retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Task retrieved successfully" },
                        data: { $ref: "#/components/schemas/Task" },
                      },
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Update task (full)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateTaskRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Task updated successfully" },
                        data: { $ref: "#/components/schemas/Task" },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: { description: "Validation error" },
          404: { description: "Task not found" },
          401: { description: "Unauthorized" },
        },
      },
      patch: {
        tags: ["Tasks"],
        summary: "Update task (partial)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateTaskRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Task" },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: { description: "Validation error" },
          404: { description: "Task not found" },
          401: { description: "Unauthorized" },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete task",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Task deleted successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        message: { example: "Task deleted successfully" },
                        data: { nullable: true, example: null },
                      },
                    },
                  ],
                },
              },
            },
          },
          404: { description: "Task not found" },
          401: { description: "Unauthorized" },
        },
      },
    },
  },
};

export default swaggerDocument;
