import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const GroupModel = sequelize.define("GroupModel", {
  group_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameGroup: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, allowNull: false },
});

export default GroupModel;
