import express from "express";
import {
  createdUsers,
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
} from "../controller/users.controller.js";

const userRoutes = express.Router();

userRoutes.post("/users", createdUsers);

userRoutes.get("/users", getAllUsers);

userRoutes.get("/users/:user_id", getUsersById);

userRoutes.put("/users/:user_id", updateUsers);

userRoutes.delete("/users/:user_id", deleteUsers);

export default userRoutes;
