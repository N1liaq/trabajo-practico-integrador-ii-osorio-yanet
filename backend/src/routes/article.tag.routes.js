import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/article.tag.controller.js";
import {
  createArticleTagValidation,
  deleteArticleTagValidation,
} from "../middlewares/validations/article.tag.validation.js";
import { validate } from "../middlewares/validate.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

export const articleTagRouter = Router();

articleTagRouter.post(
  "/articlesTags",
  createArticleTagValidation,
  userMiddleware,
  validate,
  createArticleTag,
);
articleTagRouter.delete(
  "/articlesTags/:id",
  userMiddleware,
  deleteArticleTagValidation,
  validate,
  deleteArticleTag,
);
