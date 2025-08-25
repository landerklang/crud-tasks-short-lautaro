import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const UserModel = sequelize.define(
  "UserModel",
  {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100) },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    timestamps: false,
  }
);

export default UserModel;
