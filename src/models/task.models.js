import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./user.models.js";
const Tasks = sequelize.define(
  "Tasks",
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

Tasks.belongsTo(User, { foreignKey: "user_id", as: "author" }),
  User.hasMany(Tasks, { foreignKey: "user_id", as: "author" });

export default Tasks;

// usermodel.belongsToMany(rolemodel, {
//   throuch: "user_role",
//   foreignKey: "user_id",
// });

// inclue:[{
// model:usermodel}]

//as "author"
