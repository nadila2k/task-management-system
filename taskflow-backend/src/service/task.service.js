import {
  createTaskRepo,
  findTaskByIdRepo,
  findAllTasksRepo,
  updateTaskRepo,
  deleteTaskRepo,
} from "../repository/task.repository.js";
import ApiError from "../utils/ApiError.js";

const validateId = (id) => {
  const parsedId = Number(id);
  if (!id || isNaN(parsedId) || parsedId <= 0 || !Number.isInteger(parsedId)) {
    throw ApiError.badRequest("Invalid task ID");
  }
  return parsedId;
};

export const createTaskService = async (taskData) => {
  return await createTaskRepo(taskData);
};

export const getTasksService = async (queryParams = {}) => {
  const { search, status, priority, sortBy, sortOrder } = queryParams;
  return await findAllTasksRepo({
    search,
    status,
    priority,
    sortBy,
    sortOrder,
  });
};

export const getTaskByIdService = async (id) => {
  const validId = validateId(id);
  const task = await findTaskByIdRepo(validId);
  if (!task) {
    throw ApiError.notFound(`Task with ID ${id} not found`);
  }
  return task;
};

export const updateTaskService = async (id, updateData) => {
  const validId = validateId(id);
  const task = await updateTaskRepo(validId, updateData);
  if (!task) {
    throw ApiError.notFound(`Task with ID ${id} not found`);
  }
  return task;
};

export const deleteTaskService = async (id) => {
  const validId = validateId(id);
  const task = await deleteTaskRepo(validId);
  if (!task) {
    throw ApiError.notFound(`Task with ID ${id} not found`);
  }
  return task;
};
