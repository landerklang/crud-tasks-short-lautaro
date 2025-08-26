import express from "express";
import {
  getAllGroups,
  createGroup,
  getGroupById,
  deletedGroup,
  updatedGroup,
} from "../controller/group.controller.js";

const groupsRoutes = express.Router();

groupsRoutes.post("/groups", createGroup);

groupsRoutes.get("/groups", getAllGroups);

groupsRoutes.get("/groups/:group_id", getGroupById);

groupsRoutes.delete("/groups/:group_id", deletedGroup);

groupsRoutes.put("/groups/:group_id", updatedGroup);

export default groupsRoutes;
