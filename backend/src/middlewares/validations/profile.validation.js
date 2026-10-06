import { body, param } from "express-validator";

export const createProfileValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("El first_name no debe ser vacío.")
    .isAlpha()
    .withMessage("El first_name debe contener solo letras.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El first_name no debe pasar los 50 carácteres."),

  body("last_name")
    .notEmpty()
    .withMessage("El last_name no debe ser vacío.")
    .isAlpha()
    .withMessage("El last_name debe contener solo letras.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El last_name no debe pasar los 50 carácteres."),

  body("biography").optional().isString(),

  body("avatar_url")
    .trim()
    .optional()
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("Debe ser una URL válida")
    .matches(/\.(jpeg|jpg|png|webp|gif|svg)$/i)
    .withMessage(
      "La URL debe apuntar a una imagen válida (.jpg, .png, .webp, .gif, .svg)",
    ),
  body("birth_data")
    .optional()
    .isISO8601()
    .withMessage("Formato de fecha inválido. Usa YYYY-MM-DD.")

    .isAfter("1900-01-01")
    .withMessage("La fecha debe ser posterior al año 1900.")

    .custom((value) => {
      const fechaIngresada = new Date(value);
      const hoy = new Date();

      hoy.setHours(0, 0, 0, 0);

      if (fechaIngresada >= hoy) {
        throw new Error(
          "La fecha de nacimiento no puede ser una fecha futura.",
        );
      }
      return true;
    }),
];

export const updateProfileValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del profile no debe ser nulo.")
    .isLength({ max: 3 }),

  body("first_name")
    .optional()
    .isAlpha()
    .withMessage("El first_name debe contener solo letras.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El first_name no debe pasar los 50 carácteres."),

  body("last_name")
    .optional()
    .isAlpha()
    .withMessage("El last_name debe contener solo letras.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El last_name no debe pasar los 50 carácteres."),

  body("biography").optional().isString(),

  body("avatar_url")
    .trim()
    .optional()
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("Debe ser una URL válida")
    .matches(/\.(jpeg|jpg|png|webp|gif|svg)$/i)
    .withMessage(
      "La URL debe apuntar a una imagen válida (.jpg, .png, .webp, .gif, .svg)",
    ),
  body("birth_data")
    .optional()
    .isISO8601()
    .withMessage("Formato de fecha inválido. Usa YYYY-MM-DD.")

    .isAfter("1900-01-01")
    .withMessage("La fecha debe ser posterior al año 1900.")

    .custom((value) => {
      const fechaIngresada = new Date(value);
      const hoy = new Date();

      hoy.setHours(0, 0, 0, 0);

      if (fechaIngresada >= hoy) {
        throw new Error(
          "La fecha de nacimiento no puede ser una fecha futura.",
        );
      }
      return true;
    }),
];

export const paramIDProfileValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del profile no debe ser nulo.")
    .isLength({ max: 3 }),
];
