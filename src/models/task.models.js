import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./user.models.js";
const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  description: { type: DataTypes.STRING(100), allowNull: false },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  // },
  // {
  //   timestamps: false,
  //   // createdAT: created_at,
});

// Task.belongto(User, { foreignKey: "id" });

// User.hasMany(Task, { foreignKey: "id" });

export default Task;

// usermodel.belongsToMany(rolemodel, {
//   throuch: "user_role",
//   foreignKey: "user_id",
// });

// inclue:[{
// model:usermodel}]

//as "author"
