import { body, param } from "express-validator";
import UserModel from "../../models/user.model";

export const createUserValidations = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("el campo name debe ser obligatorio")
    .isLength({ min: 1, max: 100 })
    .withMessage("el campo name debe contener entre 1 a 100 carater"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("el campo email es obligatorio")
    .isLength({ min: 1, max: 100 })
    .withMessage("el campo email debe de contener 1 a 100 caracteres")
    .custom(async (value) => {
      const emailtab = await TasksModel.findOne({ where: { email: value } });
      if (emailtab) {
        throw new Error("ya existe un usuario con ese email");
      }
    }),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("el campo contraseña es obligatorio")
    .isLength({ min: 1, max: 100 })
    .withMessage("el campo contraseña debe de contener 1 a 100 caracteres"),
];

export const getAllUserValidation = [];

export const getUserByIdValidation = [
  param("user_id")
    .isInt()
    .withMessage("el id debe de ser entero")
    .custom(async (value) => {
      const idDB = await UserModel.findByPk(value);
      if (!idDB) {
        throw new Error("no se encontro al usuario");
      }
    }),
];

export const updateUserValidations = [
  param("user_id")
    .isInt()
    .withMessage("El id debe ser entero")
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
    .isLength({ min: 1, max: 100 })
    .withMessage("el nombre debe tener entre 1 a 100 caracteres"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("el campo debe de ser tipo email")
    .notEmpty()
    .withMessage("el campo email es obligatorio")
    .isLength({ min: 1, max: 100 })
    .withMessage("el email debe tener entre 1 a 100 caracteres")
    .custom(async (value) => {
      const emailtab = await UserModel.findOne({ where: { email: value } });
      if (emailtab) {
        throw new Error("ya existe un gmail con este nombre");
      }
    }),
  body("password")
    .optional()
    .isString()
    .withMessage("el campo contraseña debe de ser de tipo cadena de caracteres")
    .notEmpty()
    .withMessage("el campo contraseña es obligatorio")
    .isLength({ min: 1, max: 100 })
    .withMessage("el campo contraseña debe de contener 1 a 100 caracteres"),
];

export const deletedUserValidations = [
  param("user_id")
    .isInt()
    .withMessage("el id debe de ser de tipo entero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("no se encontro al usuario");
      }
    }),
];
