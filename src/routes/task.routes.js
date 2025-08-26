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

tasksRoutes.get("/tasks/:task_id", getTaskById);

tasksRoutes.put("/tasks/:task_id", updateTask);

tasksRoutes.delete("/tasks/:task_id", deleteTask);

export default tasksRoutes;
