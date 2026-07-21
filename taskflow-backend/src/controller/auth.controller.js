import { 
  loginService, 
  refreshTokensService, 
  logoutService 
} from "../service/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const login = asyncHandler(async (req, res) => {
  const result = await loginService(req.validatedBody);
  return ApiResponse.success(res, "Login successful", result);
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;
  const tokens = await refreshTokensService(token);
  return ApiResponse.success(res, "Tokens refreshed successfully", tokens);
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;
  await logoutService(token);
  return ApiResponse.success(res, "Logged out successfully");
});