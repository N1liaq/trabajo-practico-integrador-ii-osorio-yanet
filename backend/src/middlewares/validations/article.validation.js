import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createArticleValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no debe ser vacío.")
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 a 200 carácteres."),

  body("content")
    .notEmpty()
    .withMessage("El content no debe ser vacío.")
    .isString()
    .isLength({ min: 50 })
    .withMessage("El content debe tener un mínimo de 50 carácteres."),

  body("excerpt")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("El excerpt debe tener un máximo de 500 carácteres."),

  body("title")
    .notEmpty()
    .withMessage("El title no debe ser vacío.")
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 a 200 carácteres."),

  body("status")
    .optional()
    .custom(async (status) => {
      const cleanStatus = status.trim().toLowerCase();
      const validStatus = ["published", "archived"];

      if (!validStatus.includes(cleanStatus)) {
        throw new Error({
          message: `El status '${status}' no es válido. Los status permitidos son "published" o "archived".`,
        });
      }
    }),

  body("user_id")
    .notEmpty()
    .withMessage("El user_id no debe ser vacío.")
    .custom((value) => typeof value === "number")
    .withMessage("El user_id debe ser de tipo number.")
    .isInt()

    .custom(async (user_id) => {
      const userExists = await UserModel.findByPk(user_id);
      if (!userExists) {
        throw new Error("El user_id ingresado no fue encontrado.");
      }
      const userRoleExists = await UserModel.findOne({ where: { role } });
      if (userRoleExists === "admin") {
        throw new Error(
          "Error al vincular artículo vuelva a intentar con otro user.",
        );
      }
      return true;
    }),
];

export const updateArticleValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del article no debe ser nulo.")
    .isLength({ max: 3 }),

  body("title")
    .optional()
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 a 200 carácteres."),

  body("content")
    .optional()
    .isString()
    .isLength({ min: 50 })
    .withMessage("El content debe tener un mínimo de 50 carácteres."),

  body("excerpt")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("El excerpt debe tener un máximo de 500 carácteres."),

  body("title")
    .optional()
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 a 200 carácteres."),

  body("status")
    .optional()
    .custom(async (status) => {
      const cleanStatus = status.trim().toLowerCase();
      const validStatus = ["published", "archived"];

      if (!validStatus.includes(cleanStatus)) {
        throw new Error({
          message: `El status '${status}' no es válido. Los status permitidos son "published" o "archived".`,
        });
      }
    }),

  body("user_id")
    .optional()
    .isEmpty()
    .withMessage("El person_id debe ser estar vacío."),
];

export const paramIDArticleValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del article no debe ser nulo.")
    .isLength({ max: 3 }),
];
