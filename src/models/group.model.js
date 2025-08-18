import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const GroupModel = sequelize.define("GroupModel", {
  nameGroup: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, allowNull: false },
});

export default GroupModel;
