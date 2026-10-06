import { Router } from "express";
import {
  createProfileUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createUserValidation,
  paramIDUserValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";
import { createProfileValidation } from "../middlewares/validations/profile.validation.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRouter = Router();

userRouter.post(
  "/users",
  adminMiddleware,
  createUserValidation,
  createProfileValidation,
  validate,
  createProfileUser,
);
userRouter.get("/users", adminMiddleware, validate, getAllUser);
userRouter.get(
  "/users/:id",
  adminMiddleware,
  paramIDUserValidation,
  validate,
  getUserById,
);
userRouter.put(
  "/users/:id",
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser,
);
userRouter.delete(
  "/users/:id",
  adminMiddleware,
  paramIDUserValidation,
  validate,
  deleteUser,
);
