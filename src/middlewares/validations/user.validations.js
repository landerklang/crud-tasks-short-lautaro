import { body, param } from "express-validator";
import UserModel from "../../models/user.model";

export const createUserValidations = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("el campo name debe ser obligatorio"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("el campo email es obligatorio"),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("el campo email es obligatorio"),
];

export const updateUserValidations = [
  param("user_id")
    .isInt()
    .withMessage("El debe ser entero")
    .custom(async (value) => {
      const person = await UserModel.findByPk(value);
      if (!person) {
        throw new Error("el usuario no existe");
      }
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("el campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 100 })
    .withMessage("el nombre debe tener entre 2 a 100 caracteres"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("el campo email es ogligatorio")
    .isLength({ min: 2, max: 100 }),
];
