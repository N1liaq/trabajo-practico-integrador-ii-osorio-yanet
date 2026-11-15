import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { createUserValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";
import {
  createProfileValidation,
  paramIDProfileValidation,
  updateProfileValidation,
} from "../middlewares/validations/profile.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { loginValidator } from "../middlewares/validations/auth.validation.js";

export const authRouter = Router();

authRouter.post("/login", loginValidator, validate, login);
authRouter.post(
  "/register",
  createUserValidation,
  createProfileValidation,
  validate,
  register,
);
authRouter.get(
  "/profile/:id",
  authMiddleware,
  paramIDProfileValidation,
  validate,
  getProfile,
);
authRouter.put(
  "/profile/:id",
  authMiddleware,
  updateProfileValidation,
  validate,
  updateProfile,
);
authRouter.post("/logout", authMiddleware, logout);
