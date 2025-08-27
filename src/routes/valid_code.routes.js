import express from "express";
import {
  createdValidCode,
  getAllValidCode,
  getValidCode,
  updateValidCode,
  deletedValidCode,
} from "../controller/valid_code.controller.js";
import {
  createValidCodeValidations,
  getAllValidCodeValidations,
  getValidCodeByIdValidation,
  updateValidCodeValidation,
  deletedValidCodeValidation,
} from "../middlewares/validations/valid_code.validations.js";
import { validator } from "../middlewares/validator.js";

export const router_valid_code = express.Router();

router_valid_code.post(
  "/valid_code",
  createValidCodeValidations,
  validator,
  createdValidCode
);

router_valid_code.get(
  "/valid_code",
  getAllValidCodeValidations,
  validator,
  getAllValidCode
);

router_valid_code.get(
  "/valid_code/:valid_code_id",
  getValidCodeByIdValidation,
  validator,
  getValidCode
);

router_valid_code.delete(
  "/valid_code/:valid_code_id",
  deletedValidCodeValidation,
  validator,
  deletedValidCode
);

router_valid_code.put(
  "/valid_code/:valid_code_id",
  updateValidCodeValidation,
  validator,
  updateValidCode
);

export default router_valid_code;
