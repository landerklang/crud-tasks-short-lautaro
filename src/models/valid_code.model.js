import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.model.js";

const ValidCodeModel = sequelize.define(
  "Valid_code",
  {
    code: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

ValidCodeModel.belongsTo(UserModel, { foreignKey: "user_id", as: "person" });
UserModel.hasOne(ValidCodeModel, { foreignKey: "user_id", as: "person" });
export default ValidCodeModel;
