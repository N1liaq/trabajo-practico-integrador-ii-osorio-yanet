import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("El username no debe ser vacío.")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 carácteres.")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ where: { username } });
      if (usernameExists) {
        throw new Error("El username ingresado ya está en uso.");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email no debe ser vacío.")
    .isEmail()
    .withMessage("Debe ingresar un email válido.")
    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ where: { email } });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso.");
      }

      const atIndex = email.indexOf("@");
      const localPart = email.slice(0, atIndex);
      if (localPart.includes("+") || localPart.includes(".")) {
        throw new Error("No se permiten puntos ni signo + antes del @.");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La password no debe ser vacía.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 carácteres."),

  body("role")
    .optional()
    .trim()
    .toLowerCase()
    .custom(async (role) => {
      const validRoles = ["user", "admin"];

      if (!validRoles) {
        throw new Error({
          message: `El rol '${role}' no es válido. Los roles permitidos son "user" o "admin".`,
        });
      }
    }),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del user no debe ser nulo.")
    .isLength({ max: 3 }),

  body("username")
    .optional()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 carácteres.")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ where: { username } });
      if (usernameExists) {
        throw new Error("El username ingresado ya está en uso.");
      }
      return true;
    }),
  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Debe ingresar un email válido.")
    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ where: { email } });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso.");
      }

      const atIndex = email.indexOf("@");
      const localPart = email.slice(0, atIndex);
      if (localPart.includes("+") || localPart.includes(".")) {
        throw new Error("No se permiten puntos ni signo + antes del @.");
      }
      return true;
    }),
  body("password")
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 carácteres."),

  body("role")
    .optional()
    .trim()
    .toLowerCase()
    .custom(async (role) => {
      const validRoles = ["user", "admin"];

      if (!validRoles) {
        throw new Error({
          message: `El rol '${role}' no es válido. Los roles permitidos son "user" o "admin".`,
        });
      }
    }),
];

export const paramIDUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del user no debe ser nulo.")
    .isLength({ max: 3 }),
];
