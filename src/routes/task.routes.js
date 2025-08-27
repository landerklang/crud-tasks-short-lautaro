import express from "express";
import {
  createTasks,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller.js";
import {
  createTaskValidations,
  getTaskByIdValidations,
  getAllTaskValidations,
  updateTaskValidation,
  deletedTaskValidation,
} from "../middlewares/validations/task.validations.js";
import { validator } from "../middlewares/validator.js";

const tasksRoutes = express.Router();

tasksRoutes.post("/tasks", createTaskValidations, validator, createTasks);

tasksRoutes.get("/tasks", getAllTaskValidations, validator, getAllTask);

tasksRoutes.get(
  "/tasks/:task_id",
  getTaskByIdValidations,
  validator,
  getTaskById
);

tasksRoutes.put("/tasks/:task_id", updateTaskValidation, validator, updateTask);

tasksRoutes.delete(
  "/tasks/:task_id",
  deletedTaskValidation,
  validator,
  deleteTask
);

export default tasksRoutes;
