import { jest, describe, test, expect, beforeEach } from "@jest/globals";


jest.unstable_mockModule("../repository/task.repository.js", () => ({
  createTaskRepo: jest.fn(),
  findTaskByIdRepo: jest.fn(),
  findAllTasksRepo: jest.fn(),
  updateTaskRepo: jest.fn(),
  deleteTaskRepo: jest.fn(),
}));


const {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} = await import("../service/task.service.js");

const {
  createTaskRepo,
  findTaskByIdRepo,
  findAllTasksRepo,
  updateTaskRepo,
  deleteTaskRepo,
} = await import("../repository/task.repository.js");

describe("Task Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Create Task - Success
  test("should create a task successfully", async () => {
    const taskData = {
      title: "Complete project",
      description: "Build task API",
      status: "pending",
    };

    const mockTask = {
      id: 1,
      ...taskData,
    };

    createTaskRepo.mockResolvedValue(mockTask);

    const result = await createTaskService(taskData);

    expect(createTaskRepo).toHaveBeenCalledWith(taskData);
    expect(result).toEqual(mockTask);
  });

  // Get All Tasks - Success
  test("should return all tasks", async () => {
    const tasks = [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ];

    findAllTasksRepo.mockResolvedValue(tasks);

    const result = await getTasksService({
      status: "pending",
    });

    expect(findAllTasksRepo).toHaveBeenCalledWith({
      search: undefined,
      status: "pending",
      priority: undefined,
      sortBy: undefined,
      sortOrder: undefined,
    });

    expect(result).toEqual(tasks);
  });

  // Get Task By ID - Success
  test("should return task by valid ID", async () => {
    const task = {
      id: 1,
      title: "Test Task",
    };

    findTaskByIdRepo.mockResolvedValue(task);

    const result = await getTaskByIdService(1);

    expect(findTaskByIdRepo).toHaveBeenCalledWith(1);
    expect(result).toEqual(task);
  });

  // Get Task By ID - Invalid ID
  test("should throw error when task ID is invalid", async () => {
    await expect(getTaskByIdService("abc")).rejects.toThrow("Invalid task ID");
  });

  // Get Task By ID - Not Found
  test("should throw not found error when task does not exist", async () => {
    findTaskByIdRepo.mockResolvedValue(null);

    await expect(getTaskByIdService(100)).rejects.toThrow(
      "Task with ID 100 not found"
    );
  });

  // Update Task - Success
  test("should update task successfully", async () => {
    const updatedTask = {
      id: 1,
      title: "Updated Task",
    };

    updateTaskRepo.mockResolvedValue(updatedTask);

    const result = await updateTaskService(1, {
      title: "Updated Task",
    });

    expect(updateTaskRepo).toHaveBeenCalledWith(1, {
      title: "Updated Task",
    });

    expect(result).toEqual(updatedTask);
  });

  // Update Task - Not Found
  test("should throw error when updating non-existing task", async () => {
    updateTaskRepo.mockResolvedValue(null);

    await expect(
      updateTaskService(500, {
        title: "New title",
      })
    ).rejects.toThrow("Task with ID 500 not found");
  });

  // Delete Task - Success
  test("should delete task successfully", async () => {
    const deletedTask = {
      id: 1,
      title: "Deleted Task",
    };

    deleteTaskRepo.mockResolvedValue(deletedTask);

    const result = await deleteTaskService(1);

    expect(deleteTaskRepo).toHaveBeenCalledWith(1);
    expect(result).toEqual(deletedTask);
  });
});