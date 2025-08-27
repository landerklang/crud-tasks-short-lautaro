import express from "express";
import {
  createdUsers,
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
} from "../controller/users.controller.js";
import {
  createUserValidations,
  getUserByIdValidation,
  getAllUserValidation,
  updateUserValidations,
  deletedUserValidations,
} from "../middlewares/validations/user.validations.js";
import { validator } from "../middlewares/validator.js";

const userRoutes = express.Router();

userRoutes.post("/users", createUserValidations, validator, createdUsers);

userRoutes.get("/users", getAllUserValidation, validator, getAllUsers);

userRoutes.get(
  "/users/:user_id",
  getUserByIdValidation,
  validator,
  getUsersById
);

userRoutes.put(
  "/users/:user_id",
  updateUserValidations,
  validator,
  updateUsers
);

userRoutes.delete(
  "/users/:user_id",
  deletedUserValidations,
  validator,
  deleteUsers
);

export default userRoutes;
