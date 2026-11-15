import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getMyArticleById,
  getArticleById,
  getMyArticles,
  updateArticle,
} from "../controllers/article.controller.js";

import {
  createArticleValidation,
  paramIDArticleValidation,
} from "../middlewares/validations/article.validation.js";
import { validate } from "../middlewares/validate.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  userMiddleware,
  createArticleValidation,
  validate,
  createArticle,
);
articleRouter.get("/articles", validate, getAllArticles);
articleRouter.get(
  "/articles/:id",
  userMiddleware,
  paramIDArticleValidation,
  validate,
  getArticleById,
);
articleRouter.get(
  "/articles/user",
  userMiddleware,
  paramIDArticleValidation,
  validate,
  getMyArticles,
);
articleRouter.get(
  "/articles/user/:id",
  userMiddleware,
  paramIDArticleValidation,
  validate,
  getMyArticleById,
);
articleRouter.put("/articles/:id", updateArticle);
articleRouter.delete(
  "/articles/:id",
  userMiddleware,
  paramIDArticleValidation,
  validate,
  deleteArticle,
);
