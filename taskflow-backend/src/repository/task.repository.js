import { Op } from "sequelize";
import Task from "../models/Task.js";
import { TaskPriority } from "../enum/priority.enum.js";
import { TaskStatus } from "../enum/status.enum.js";

export const createTaskRepo = async (taskData) => {
  return await Task.create(taskData);
};

export const findTaskByIdRepo = async (id) => {
  return await Task.findByPk(id);
};

export const findAllTasksRepo = async ({ search, status, priority, sortBy, sortOrder }) => {
  const where = {};

  if (search && search.trim() !== "") {
    where.title = { [Op.iLike]: `%${search.trim()}%` };
  }

  if (status && status.trim() !== "") {
    const formattedStatus = status.trim().toUpperCase().replace(/\s+/g, "_");
    const matchedStatus = Object.values(TaskStatus).find(
      (val) => val === formattedStatus
    );
    if (matchedStatus) {
      where.status = matchedStatus;
    }
  }

  if (priority && priority.trim() !== "") {
    const formattedPriority = priority.trim().toUpperCase();
    const matchedPriority = Object.values(TaskPriority).find(
      (val) => val === formattedPriority
    );
    if (matchedPriority) {
      where.priority = matchedPriority;
    }
  }

  let order = [["created_at", "DESC"]]; // Default: Newest Created

  const normalizedSortBy = sortBy ? sortBy.trim() : "";
  const normalizedSortOrder = sortOrder && sortOrder.trim().toUpperCase() === "ASC" ? "ASC" : "DESC";

  if (normalizedSortBy === "oldest") {
    order = [["created_at", "ASC"]];
  } else if (normalizedSortBy === "newest") {
    order = [["created_at", "DESC"]];
  } else if (
    normalizedSortBy.toLowerCase() === "duedate" ||
    normalizedSortBy.toLowerCase() === "due_date" ||
    normalizedSortBy.toLowerCase() === "due"
  ) {
    const dueOrder = sortOrder ? normalizedSortOrder : "ASC";
    order = [["due_date", dueOrder]];
  } else if (normalizedSortBy) {
    const colName =
      normalizedSortBy === "dueDate"
        ? "due_date"
        : normalizedSortBy === "createdAt"
        ? "created_at"
        : normalizedSortBy === "updatedAt"
        ? "updated_at"
        : normalizedSortBy;
    order = [[colName, normalizedSortOrder]];
  }

  return await Task.findAll({
    where,
    order,
  });
};

export const updateTaskRepo = async (id, updateData) => {
  const task = await Task.findByPk(id);
  if (!task) return null;
  return await task.update(updateData);
};

export const deleteTaskRepo = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) return null;
  await task.destroy();
  return task;
};
