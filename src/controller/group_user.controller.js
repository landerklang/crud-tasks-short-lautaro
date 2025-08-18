import GroupUserModel from "../models/group_user.model.js";
import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";

export const create_Group_User = async (req, res) => {
  const { user_id, group_id } = req.body;
  if (!user_id || group_id === "") {
    return res.status(500).json({
      message: "debe existir un usuario y un grupo para crear el campo ",
    });
  }
  try {
    const crear = await GroupUserModel.create({ user_id, group_id });
    res.status(201).json(crear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGroupsUser = async (req, res) => {
  try {
    const groupuser = await GroupUserModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: { exclude: ["password", "email"] },
        },
      ],
      include: [
        {
          model: GroupModel,
          as: "group",
          attributes: { exclude: ["nameGroups", "descripcion"] },
        },
      ],
    });
    res.json(groupuser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
