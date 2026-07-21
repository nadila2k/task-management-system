import { Router } from "express";
import { login, refreshToken, logout } from "../controller/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validations/login.validation.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;