import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "../service/task.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskService(req.validatedBody);
  return ApiResponse.success(res, "Task created successfully", task, 201);
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await getTasksService(req.query);
  return ApiResponse.success(res, "Tasks retrieved successfully", tasks);
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await getTaskByIdService(id);
  return ApiResponse.success(res, "Task retrieved successfully", task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await updateTaskService(id, req.validatedBody);
  return ApiResponse.success(res, "Task updated successfully", task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteTaskService(id);
  return ApiResponse.success(res, "Task deleted successfully");
});
