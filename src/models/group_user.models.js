import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./user.models.js";
import Group from "./group.models.js";

const Group_User = sequelize.define(
  "Group_User"
  //   {
  //     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //   },
  //   {
  //     timestamps: false,
  //   }
);

User.belongsToMany(Group, {
  through: Group_User,
  foreignKey: "user_id",
  as: "groups",
});
Group.belongsToMany(User, {
  through: Group_User,
  foreignKey: "group_id",
  as: "users",
});
export default Group_User;
