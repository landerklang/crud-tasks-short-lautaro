import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.model.js";

const ValidCodeModel = sequelize.define(
  "Valid_code",
  {
    valid_code_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

ValidCodeModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
UserModel.hasOne(ValidCodeModel, {
  foreignKey: "valid_code_id",
  as: "code_valid",
});

UserModel.addHook("afterDestroy", async (user) => {
  const code_valid = await ValidCodeModel.findOne({
    where: { person: user.dataValues.id },
  });
  await code_valid.destroy();
});
export default ValidCodeModel;

///el afterbulkdestroy sirve solamente si quieres eliminas mas de un regristro
