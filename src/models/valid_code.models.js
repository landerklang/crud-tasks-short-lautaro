import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./user.models.js";

const Valid_code = sequelize.define(
  "Valid_code",
  {
    code: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Valid_code.belongsTo(User, { foreignKey: "user_id", as: "person" });
User.hasOne(Valid_code, { foreignKey: "user_id", as: "person" });
export default Valid_code;
