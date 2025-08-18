import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const UserModel = sequelize.define(
  "UserModel",
  {
    name: { type: DataTypes.STRING(100) },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    timestamps: false,
  }
);

export default UserModel;
