import bcrypt from "bcrypt";
import { 
  findUserByEmail, 
  findUserById, 
  findUserByRefreshToken, 
  updateUserRefreshToken 
} from "../repository/auth.repository.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const payload = { id: user.id, email: user.email };
  const { accessToken, refreshToken } = generateTokens(payload);

  await updateUserRefreshToken(user.id, refreshToken);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

export const refreshTokensService = async (token) => {
  if (!token) {
    throw ApiError.badRequest("Refresh token is required");
  }

  try {
    const decoded = verifyRefreshToken(token);

    const user = await findUserById(decoded.id);
    if (!user || user.refreshToken !== token) {
      throw ApiError.unauthorized("Invalid refresh token");
    }

    const payload = { id: user.id, email: user.email };
    const tokens = generateTokens(payload);

    await updateUserRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }
};

export const logoutService = async (refreshToken) => {
  if (!refreshToken) return true;

  const user = await findUserByRefreshToken(refreshToken);
  if (user) {
    await updateUserRefreshToken(user.id, null);
  }
  return true;
};