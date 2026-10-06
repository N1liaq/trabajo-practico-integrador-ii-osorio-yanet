import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfile,
  getProfileById,
  updateProfile,
} from "../controllers/profile.controller.js";
import {
  createProfileValidation,
  paramIDProfileValidation,
  updateProfileValidation,
} from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const profileRouter = Router();

profileRouter.post(
  "/profiles",
  adminMiddleware,
  createProfileValidation,
  validate,
  createProfile,
);
profileRouter.get("/profiles", adminMiddleware, validate, getAllProfile);
profileRouter.get(
  "/profiles/:id",
  paramIDProfileValidation,
  validate,
  getProfileById,
);
profileRouter.put(
  "/profiles/:id",
  adminMiddleware,
  updateProfileValidation,
  validate,
  updateProfile,
);
profileRouter.delete(
  "/profiles/:id",
  adminMiddleware,
  paramIDProfileValidation,
  validate,
  deleteProfile,
);
