import express from "express";
import {
  createdValidCode,
  getAllValidcode,
} from "../controller/valid_code.controller.js";

export const router_valid_code = express.Router();

router_valid_code.post("/valid_code", createdValidCode);

router_valid_code.get("/valid_code", getAllValidcode);

export default router_valid_code;
