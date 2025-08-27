import { body, param } from "express-validator";
import TasksModel from "../../models/task.model";

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
      const titletab = await TasksModel.findOne(value);
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
    .trim()
    .notEmpty()
    .withMessage("el estado de la tarea es obligatorio")
    .isBoolean()
    .withMessage("el estado de la tarea debe ser booleano"),
];

export const updateTaskValidation = [
  param("task_id")
    .isInt()
    .withMessage("el id debe ser entero")
    .custom(async (value) => {
      const task = await UserModel.findByPk(value);
      if (!task) {
        throw new Error("el usuario no existe");
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
