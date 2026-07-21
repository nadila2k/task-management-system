import { z } from "zod";
import { TaskPriority } from "../enum/priority.enum.js";
import { TaskStatus } from "../enum/status.enum.js";

const validPriorities = Object.values(TaskPriority);
const validStatuses = Object.values(TaskStatus);

const normalizePriority = (val) => {
  if (typeof val === "string") {
    return val.trim().toUpperCase();
  }
  return val;
};

const normalizeStatus = (val) => {
  if (typeof val === "string") {
    return val.trim().toUpperCase().replace(/\s+/g, "_");
  }
  return val;
};

const isNotEarlierThanToday = (val) => {
  if (!val) return true;
  const inputDate = new Date(val);
  if (isNaN(inputDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputDay = new Date(inputDate);
  if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val.trim())) {
    const [year, month, day] = val.trim().split("-").map(Number);
    inputDay.setFullYear(year, month - 1, day);
  }
  inputDay.setHours(0, 0, 0, 0);

  return inputDay >= today;
};

export const createTaskSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .trim()
    .min(1, "Title is required"),

  description: z
    .string({
      message: "Description must be a string",
    })
    .optional()
    .nullable(),

  priority: z.preprocess(
    normalizePriority,
    z
      .string({
        message: "Priority is required",
      })
      .trim()
      .min(1, "Priority is required")
      .refine((val) => validPriorities.includes(val), {
        message: `Priority must be one of: ${validPriorities.join(", ")}`,
      })
  ),

  status: z.preprocess(
    normalizeStatus,
    z
      .string({
        message: "Status is required",
      })
      .trim()
      .min(1, "Status is required")
      .refine((val) => validStatuses.includes(val), {
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      })
  ),

  dueDate: z
    .string({
      message: "Due date is required",
    })
    .trim()
    .min(1, "Due date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid due date format",
    })
    .refine(isNotEarlierThanToday, {
      message: "Due date cannot be earlier than today",
    }),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      message: "Title must be a string",
    })
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),

  description: z
    .string({
      message: "Description must be a string",
    })
    .optional()
    .nullable(),

  priority: z
    .preprocess(
      normalizePriority,
      z
        .string({
          message: "Priority must be a string",
        })
        .trim()
        .min(1, "Priority cannot be empty")
        .refine((val) => validPriorities.includes(val), {
          message: `Priority must be one of: ${validPriorities.join(", ")}`,
        })
    )
    .optional(),

  status: z
    .preprocess(
      normalizeStatus,
      z
        .string({
          message: "Status must be a string",
        })
        .trim()
        .min(1, "Status cannot be empty")
        .refine((val) => validStatuses.includes(val), {
          message: `Status must be one of: ${validStatuses.join(", ")}`,
        })
    )
    .optional(),

  dueDate: z
    .string({
      message: "Due date must be a string",
    })
    .trim()
    .min(1, "Due date cannot be empty")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid due date format",
    })
    .refine(isNotEarlierThanToday, {
      message: "Due date cannot be earlier than today",
    })
    .optional(),
});
