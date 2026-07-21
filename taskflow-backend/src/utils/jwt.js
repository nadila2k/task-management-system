import jwt from "jsonwebtoken";



const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "02529484c8038f4e75a6a5aee471cc2075d11c5ebbf0644bffdf2ab16ewrfqrefrefref0ac8c153fccf4a5807357e0912a96";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "02529484ie3dnio3nedoifenfdoi1414ref58re4ff18b664894f5046c14779c45859f0afddc1e1950ac8c153fccf4a5807357e0912a96";


export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  return { accessToken, refreshToken };
};


export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET, { algorithms: ["HS256"] });
};


export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET, { algorithms: ["HS256"] });
};