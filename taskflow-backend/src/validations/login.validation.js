import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a valid text string",
    })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a valid text string",
    })
    .trim()
    .min(1, "Password cannot be empty"),
});