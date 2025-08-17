import express from "express";
import { getAllGroups, createGroup } from "../controller/group.controller.js";

const groupsRoutes = express.Router();

groupsRoutes.post("/groups", createGroup);

groupsRoutes.get("/groups", getAllGroups);

export default groupsRoutes;
