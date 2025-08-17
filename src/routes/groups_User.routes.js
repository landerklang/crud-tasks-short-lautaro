import express from "express";
import {
  create_Group_User,
  getAllGroupsUser,
} from "../controller/group_user.controller.js";

const groupsUserRoutes = express.Router();

groupsUserRoutes.post("/groups_user", create_Group_User);

groupsUserRoutes.get("/groups_user", getAllGroupsUser);

export default groupsUserRoutes;
