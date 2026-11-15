import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTag,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import {
  createTagValidation,
  updateTagValidation,
  paramIDTagValidation,
} from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validate.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

export const tagRouter = Router();

tagRouter.post(
  "/tags",
  adminMiddleware,
  createTagValidation,
  validate,
  createTag,
);
tagRouter.get("/tags", userMiddleware, validate, getAllTag);
tagRouter.get(
  "/tags/:id",
  adminMiddleware,
  paramIDTagValidation,
  validate,
  getTagById,
);
tagRouter.put(
  "/tags/:id",
  adminMiddleware,
  updateTagValidation,
  validate,
  updateTag,
);
tagRouter.delete(
  "/tags/:id",
  adminMiddleware,
  paramIDTagValidation,
  validate,
  deleteTag,
);
