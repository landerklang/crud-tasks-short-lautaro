import Group_User from "../models/group_user.models.js";
import User from "../models/user.models.js";
import Group from "../models/group.models.js";

export const create_Group_User = async (req, res) => {
  const { user_id, group_id } = req.body;
  if (!user_id || group_id === "") {
    return res.status(500).json({
      message: "debe existir un usuario y un grupo para crear el campo ",
    });
  }
  try {
    const crear = await Group_User.create({ user_id, group_id });
    res.status(201).json(crear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGroupsUser = async (req, res) => {
  try {
    const GroupsUser = await Group_User.findAll({
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "email"] },
      },
      include: {
        model: Group,
        as: "groups",
        attributes: { exclude: ["nameGroups", "descripcion"] },
      },
    });
    res.json(GroupsUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
