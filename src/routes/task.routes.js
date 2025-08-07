import express from "express";

const tasksRoutes = express.Router();

tasksRoutes.post("/tasks");

tasksRoutes.get("/tasks");

tasksRoutes.get("/tasks/:id:");

tasksRoutes.put("/tasks/:id:");

tasksRoutes.delete("/tasks/:id:");

export default tasksRoutes;
