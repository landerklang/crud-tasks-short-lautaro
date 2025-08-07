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

userRoutes.get("/users/:id", getUsersById);

userRoutes.put("/users/:id", updateUsers);

userRoutes.delete("users/:id", deleteUsers);

export default userRoutes;
