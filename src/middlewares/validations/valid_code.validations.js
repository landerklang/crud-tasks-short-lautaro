import { body, param } from "express-validator";
import ValidCodeModel from "../../models/valid_code.model.js";

export const createValidCodeValidations = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("el campo codigo es obligatorio")
    .isString()
    .withMessage("el code debe ser cadena de caracteres"),
  body("telefono")
    .trim()
    .notEmpty()
    .withMessage("el campo telefono es obligatorio")
    .isInt()
    .withMessage("el campo telefono debe ser entero"),
];

export const updateValidCodeValidation = [
  param("valid_code_id").isInt().withMessage("el id debe ser entero"),

  body("code")
    .optional()
    .isString()
    .withMessage("el codigo debe ser una cadena de caracteres"),
  body("telefono")
    .optional()
    .isInt()
    .withMessage("el campo telefono debe ser entero"),
];
