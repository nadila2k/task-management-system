import User from "../models/User.js";


export const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

export const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const findUserByRefreshToken = async (refreshToken) => {
  return await User.findOne({
    where: { refreshToken },
  });
};

export const updateUserRefreshToken = async (userId, refreshToken) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return null;
  }

  return await user.update({ refreshToken });
};