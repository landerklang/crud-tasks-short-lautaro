import express from "express";
import {
  create_Group_User,
  getAllGroupsUser,
  getGroupUserById,
  updateGroupUser,
  destroyGroupUser,
} from "../controller/group_user.controller.js";

const groupsUserRoutes = express.Router();

groupsUserRoutes.post("/groups_user", create_Group_User);

groupsUserRoutes.get("/groups_user", getAllGroupsUser);

groupsUserRoutes.get("/groups_user/:group_user_id", getGroupUserById);

groupsUserRoutes.put("/groups_user/:group_user_id", updateGroupUser);

groupsUserRoutes.delete("/groups_user/:group_user_id", destroyGroupUser);
export default groupsUserRoutes;
