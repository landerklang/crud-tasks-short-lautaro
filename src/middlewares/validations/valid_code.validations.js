import { body, param } from "express-validator";
import ValidCodeModel from "../../models/valid_code.model.js";

export const createValidCodeValidations = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("el campo codigo es obligatorio")
    .isString()
    .withMessage("el code debe ser cadena de caracteres")
    .custom(async (value) => {
      const codetab = await ValidCodeModel.findOne({ where: { code: value } });
      if (codetab) {
        throw new Error("ya existe un usuario con ese codigo");
      }
    }),
  body("telefono")
    .notEmpty()
    .withMessage("el campo telefono es obligatorio")
    .isInt()
    .withMessage("el campo telefono debe ser entero"),
];

export const getAllValidCodeValidations = [];

export const getValidCodeByIdValidation = [
  param("valid_code_id")
    .isInt()
    .withMessage("el id debe de ser entero")
    .custom(async (value) => {
      const valid_codeBD = await ValidCodeModel.findByPk(value);
      if (!valid_codeBD) {
        throw new Error("no se encontre el codigo de validacion");
      }
    }),
];

export const updateValidCodeValidation = [
  param("valid_code_id")
    .isInt()
    .withMessage("el id debe ser entero")
    .custom(async (value) => {
      const idvalidcode = await ValidCodeModel.findByPk(value);
      if (!idvalidcode) {
        throw new Error("el codigo de validacion no existe");
      }
    }),
  body("code")
    .optional()
    .isString()
    .withMessage("el codigo debe ser una cadena de caracteres")
    .custom(async (value) => {
      const codeDB = await ValidCodeModel.findOne({ where: { code: value } });
      if (!codeDB) {
        throw new Error("ya existe un codigo de valicion en la base de datos");
      }
    }),
  body("telefono")
    .optional()
    .isInt()
    .withMessage("el campo telefono debe ser entero"),
];

export const deletedValidCodeValidation = [
  param("valid_code_id")
    .isInt()
    .withMessage("el ID debe de ser entero")
    .custom(async (value) => {
      const ValidCodeID = await ValidCodeModel.findByPk(value);
      if (!ValidCodeID) {
        throw new Error("no se encontro el codigo de validacion");
      }
    }),
];
