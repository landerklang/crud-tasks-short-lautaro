import express from "express";
import {
  create_Group_User,
  getAllGroupsUser,
  getGroupUserById,
  updateGroupUser,
  destroyGroupUser,
} from "../controller/group_user.controller.js";
import {
  createGroupUserValidations,
  getAllGroupsUserValidations,
  getByGroupUserValidations,
  updatedGroupUserValidations,
  deletedGroupUserValidations,
} from "../middlewares/validations/group_user.validations.js";
import { validator } from "../middlewares/validator.js";

const groupsUserRoutes = express.Router();

groupsUserRoutes.post(
  "/groups_user",
  createGroupUserValidations,
  validator,
  create_Group_User
);

groupsUserRoutes.get(
  "/groups_user",
  getAllGroupsUserValidations,
  validator,
  getAllGroupsUser
);

groupsUserRoutes.get(
  "/groups_user/:group_user_id",
  getByGroupUserValidations,
  validator,
  getGroupUserById
);

groupsUserRoutes.put(
  "/groups_user/:group_user_id",
  updatedGroupUserValidations,
  validator,
  updateGroupUser
);

groupsUserRoutes.delete(
  "/groups_user/:group_user_id",
  deletedGroupUserValidations,
  validator,
  destroyGroupUser
);
export default groupsUserRoutes;
