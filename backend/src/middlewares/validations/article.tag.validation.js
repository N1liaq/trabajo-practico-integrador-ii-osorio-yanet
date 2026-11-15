import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";

export const createArticleTagValidation = [
  body("article_id")
    .notEmpty()
    .withMessage("El article_id no debe ser vacío.")
    .custom((value) => typeof value === "number")
    .withMessage("El article_id debe ser de tipo number.")
    .isInt()

    .custom(async (article_id) => {
      const articleExists = await ArticleModel.findByPk(article_id);
      if (!articleExists) {
        throw new Error("El article_id ingresado no fue encontrado.");
      }

      return true;
    }),

  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id no debe ser vacío.")
    .custom((value) => typeof value === "number")
    .withMessage("El tag_id debe ser de tipo number.")
    .isInt()

    .custom(async (tag_id) => {
      const tagExists = await TagModel.findByPk(tag_id);
      if (!tagExists) {
        throw new Error("El tag_id ingresado no fue encontrado.");
      }

      return true;
    }),
];

export const deleteArticleTagValidation = [
  param("id").notEmpty().withMessage("El ID del articleTag no debe ser nulo."),
];
