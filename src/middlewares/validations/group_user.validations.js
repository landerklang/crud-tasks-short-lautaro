import { body, param } from "express-validator";
import GroupUserModel from "../../models/group_user.model";
import UserModel from "../../models/user.model";
import GroupModel from "../../models/group.model";

export const createGroupUserValidations = [
  body("user_id")
    .isInt()
    .withMessage("el user_Id debe de ser entero")
    .notEmpty()
    .withMessage("el user_id es obligatorio")
    .custom(async (value) => {
      const userid = await UserModel.findByPk(value);
      if (userid === null) {
        throw new Error("no existe un usuario con este Id");
      }
    }),
  body("group_id")
    .isInt()
    .withMessage("el group_Id debe de ser entero")
    .notEmpty()
    .withMessage("el group_id es obligatorio")
    .custom(async (groupvalidar) => {
      const groupid = await GroupModel.findByPk(groupvalidar);
      if (groupid === null) {
        throw new Error("no existe un grupo con ese ID");
      }
    }),
];

export const getAllGroupsUserValidations = [];

export const getByGroupUserValidations = [
  param("group_user_id")
    .isInt()
    .withMessage("el groupUserID debe de ser tipo entero")
    .custom(async (value) => {
      const GroupUserId = await GroupUserModel.findByPk(value);
      if (!GroupUserId) {
        throw new Error("no se encontro el grupo y usuario correspondiente");
      }
    }),
];

export const updatedGroupUserValidations = [
  param("group_user_id")
    .optional()
    .isInt()
    .withMessage("el groupUserID debe de ser entero")
    .custom(async (value) => {
      const GroupUserId = await GroupUserModel.findByPk(value);
      if (!GroupUserId) {
        throw new Error("no se encontro el grupo y usuaria");
      }
    }),
  body("user_id")
    .optional()
    .isInt()
    .withMessage("el userID debe de ser entero")
    .custom(async (uservalid) => {
      const userID = await GroupUserModel.findOne({
        where: { user_id: uservalid },
      });
      if (userID) {
        throw new Error("ya existe in usario con ese ID");
      }
    }),
  body("group_id")
    .optional()
    .isInt()
    .withMessage("el groupID debe de ser entero")
    .custom(async (groupvalid) => {
      const groupID = await GroupUserModel.findOne({
        where: { group_id: groupvalid },
      });
      if (groupID) {
        throw new Error("ya existe un usario con ese ID");
      }
    }),
];

export const deletedGroupUserValidations = [
  param("group_user_id")
    .isInt()
    .withMessage("el ID debe de ser entero ")
    .custom(async (value) => {
      const groupuserid = await GroupUserModel.findByPk(value);
      if (!groupuserid) {
        throw new Error("no se encontro el grupo Usuario");
      }
    }),
];
