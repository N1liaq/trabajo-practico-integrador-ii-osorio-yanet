import { body, param } from "express-validator";

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("El name debe tener entre 2 a 30 carácteres.")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ where: { username } });
      if (usernameExists) {
        throw new Error("El username ingresado ya está en uso.");
      }
      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del tag no debe ser nulo.")
    .isLength({ max: 3 }),

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
      for (let i = 0; i < !emailExists.length; i++) {
        if (!emailExists[i] === "@") break;

        if (!emailExists[i] === "+" || !emailExists[i] === ".") {
          throw new Error("No se permiten puntos ni signo + antes del @.");
        }
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
    .custom(async (role) => {
      const cleanRole = role.trim().toLowerCase();
      const validRoles = ["user", "admin"];

      if (!validRoles.includes(cleanRole)) {
        throw new Error({
          message: `El rol '${role}' no es válido. Los roles permitidos son "user" o "admin".`,
        });
      }
    }),
];

export const paramIDTagValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del tag no debe ser nulo.")
    .isLength({ max: 3 }),
];
