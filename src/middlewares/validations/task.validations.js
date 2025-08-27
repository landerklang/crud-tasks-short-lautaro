import { body, param } from "express-validator";
import TasksModel from "../../models/task.model.js";

export const createTaskValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("el titulo debe ser obligatorio")
    .isString()
    .withMessage("el titulo debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 100 })
    .withMessage("el titulo solo puede contener entre 2 a 100 caracteres")
    .custom(async (value) => {
      const titletab = await TasksModel.findOne({ where: { title: value } });
      if (titletab) {
        throw new Error("ya existe una tarea con ese titulo");
      }
    }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("la descripcion es obligatoria ")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("la descripcion solo puede contener entre 1 a 100 caracteres"),
  body("isComplete")
    .notEmpty()
    .withMessage("el estado de la tarea es obligatorio")
    .isBoolean()
    .not()
    .isString()
    .not()
    .isNumeric()
    .withMessage("el estado de la tarea debe ser booleano"),
];

export const getAllTaskValidations = [];

export const getTaskByIdValidations = [
  param("task_id")
    .isInt()
    .withMessage("el id debe ser entero")
    .custom(async (value) => {
      const idDB = await TasksModel.findByPk(value);
      if (!idDB) {
        throw new Error("la tarea no existe");
      }
    }),
];

export const updateTaskValidation = [
  param("task_id")
    .isInt()
    .withMessage("el id debe ser entero")
    .custom(async (value) => {
      const task = await TasksModel.findByPk(value);
      if (!task) {
        throw new Error("la tarea no existe");
      }
    }),
  body("title")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("el titulo solamente puede contener de 1 a 100 caracteres")
    .isString()
    .withMessage("el titulo debe ser una cadena de caracteres"),
  body("description")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("la descripsion debe contener entre 1 a 100 caracteres")
    .isString()
    .withMessage("la descripcion debe ser una cadena de caracteres"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("el estado de la tarea debe ser booleano"),
];

export const deletedTaskValidation = [
  param("task_id")
    .isInt()
    .withMessage("el id debe ser entero")
    .custom(async (value) => {
      const idDB = await TasksModel.findByPk(value);
      if (!idDB) {
        throw new Error("no se encontro la tarea");
      }
    }),
];
