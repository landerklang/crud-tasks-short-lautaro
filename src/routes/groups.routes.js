import express from "express";
import {
  getAllGroups,
  createGroup,
  getGroupById,
  deletedGroup,
  updatedGroup,
} from "../controller/group.controller.js";
import {
  createGroupValidation,
  getAllGroupsValidations,
  getGroupsByIdValidations,
  deletedGroupValidation,
  updateGroupValidations,
} from "../middlewares/validations/group.validations.js";

const groupsRoutes = express.Router();

groupsRoutes.post("/groups", createGroupValidation, validator, createGroup);

groupsRoutes.get("/groups", getAllGroupsValidations, validator, getAllGroups);

groupsRoutes.get(
  "/groups/:group_id",
  getGroupsByIdValidations,
  validator,
  getGroupById
);

groupsRoutes.delete(
  "/groups/:group_id",
  deletedGroupValidation,
  validator,
  deletedGroup
);

groupsRoutes.put(
  "/groups/:group_id",
  updateGroupValidations,
  validator,
  updatedGroup
);

export default groupsRoutes;
