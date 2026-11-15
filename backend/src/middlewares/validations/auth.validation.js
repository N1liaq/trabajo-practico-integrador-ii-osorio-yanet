import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("El username no debe ser vacío.")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 carácteres.")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ where: { username } });
      if (!usernameExists) {
        throw new Error("credenciales incorrectas");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La password no debe ser vacía.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 carácteres."),
];
