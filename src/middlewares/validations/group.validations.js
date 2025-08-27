import { body, param } from "express-validator";
import GroupModel from "../../models/group.model.js";

export const createGroupValidation = [
  body("nameGroup")
    .trim()
    .notEmpty()
    .withMessage("el campo nombre grupo debe ser obligatorio")
    .isString()
    .withMessage("el nombre de grupo debe de ser de tipo cadena de caracteres")
    .custom(async (value) => {
      const nameGroupDB = await GroupModel.findOne({
        where: { nameGroup: value },
      });
      if (nameGroupDB) {
        throw new Error("ya existe un grupo con ese nombre");
      }
    }),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("la descripcion debe ser obligatorio ")
    .isString()
    .withMessage("la descripcion debe de ser de tipo cadena de caracteres"),
];

export const getAllGroupsValidations = [];

export const getGroupsByIdValidations = [
  param("group_id")
    .isInt()
    .withMessage("el id debe de ser entero")
    .custom(async (value) => {
      const groupId = await GroupModel.findByPk(value);
      if (!groupId) {
        throw new Error("no se encontre el grupo");
      }
    }),
];

export const updateGroupValidations = [
  param("group_Id")
    .isInt()
    .withMessage("el id debe de ser entero")
    .custom(async (value) => {
      const groupId = await GroupModel.findByPk(value);
      if (!groupId) {
        throw new Error("no se encontre el grupo");
      }
    }),
  body("nameGroups")
    .optional()
    .isString()
    .withMessage(
      "el campo nombre de grupo debe de ser tipo cadena de caracteres"
    )
    .custom(async (value) => {
      const groupName = await GroupModel.findOne(value);
      if (!groupName) {
        throw new Error("ya existe un grupo con ese nombre");
      }
    }),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("la descripsion debe ser de tipo cadena de caracteres"),
];

export const deletedGroupValidation = [
  param("group_id")
    .isInt()
    .withMessage("el ID debe de ser entero")
    .custom(async (value) => {
      const groupID = await GroupModel.findByPk(value);
      if (!groupID) {
        throw new Error("no se encontro el grupo");
      }
    }),
];
