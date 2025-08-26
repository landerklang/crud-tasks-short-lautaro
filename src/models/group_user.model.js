import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import UserModel from "./user.model.js";
import GroupModel from "./group.model.js";

const GroupUserModel = sequelize.define(
  "Group_User",
  {
    group_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
  }

  //   {
  //     timestamps: false,
  //   }
);

UserModel.belongsToMany(GroupModel, {
  through: GroupUserModel,
  foreignKey: "user_id",
  as: "groups",
});
GroupModel.belongsToMany(UserModel, {
  through: GroupUserModel,
  foreignKey: "group_id",
  as: "users",
});

GroupUserModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

GroupUserModel.belongsTo(GroupModel, { foreignKey: "group_id", as: "group" });
export default GroupUserModel;
