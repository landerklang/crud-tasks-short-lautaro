import express from "express";
import {
  createTasks,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller.js";

const tasksRoutes = express.Router();

tasksRoutes.post("/tasks", createTasks);

tasksRoutes.get("/tasks", getAllTask);

tasksRoutes.get("/tasks/:id", getTaskById);

tasksRoutes.put("/tasks/:id", updateTask);

tasksRoutes.delete("/tasks/:id", deleteTask);

export default tasksRoutes;
