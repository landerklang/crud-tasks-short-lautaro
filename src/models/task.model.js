import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import UserModel from "./user.model.js";
const TasksModel = sequelize.define(
  "TasksModel",
  {
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
  },
  {
    timestamps: false,
  }
);

TasksModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
  onDelete: "CASCADE",
}),
  UserModel.hasMany(TasksModel, { foreignKey: "user_id", as: "author" });

export default TasksModel;

// usermodel.belongsToMany(rolemodel, {
//   throuch: "user_role",
//   foreignKey: "user_id",
// });

// inclue:[{
// model:usermodel}]

//as "author"
