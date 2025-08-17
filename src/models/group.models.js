import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Group = sequelize.define("Group", {
  nameGroup: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, allowNull: false },
});

export default Group;
