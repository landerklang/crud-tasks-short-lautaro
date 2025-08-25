import express from "express";
import {
  createdValidCode,
  getAllValidCode,
  getValidCode,
  updateValidCode,
  deletedValidCode,
} from "../controller/valid_code.controller.js";

export const router_valid_code = express.Router();

router_valid_code.post("/valid_code", createdValidCode);

router_valid_code.get("/valid_code", getAllValidCode);

router_valid_code.get("/valid_code", getValidCode);

router_valid_code.delete("/valid_code", deletedValidCode);

router_valid_code.delete("/valid_code", deletedValidCode);

export default router_valid_code;
