import GroupUserModel from "../models/group_user.model.js";
import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";

export const create_Group_User = async (req, res) => {
  const { user_id, group_id, group_user_id } = req.body;
  if (!user_id || group_id === "") {
    return res.status(500).json({
      message: "debe existir un usuario y un grupo para crear el campo ",
    });
  }
  try {
    const crear = await GroupUserModel.create({
      user_id,
      group_id,
      group_user_id,
    });
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

export const getGroupUserById = async (req, res) => {
  try {
    const groupuser = await GroupUserModel.findByPk(req.params.group_user_id, {
      include: [
        {
          model: UserModel,
          as: "user",
          actributes: { exclude: ["password", "email"] },
        },
      ],
      include: [
        {
          model: GroupModel,
          as: "group",
        },
      ],
    });
    if (groupuser) res.json(groupuser);
    else
      return res
        .status(404)
        .json({ message: "no se encontro elgrupo y usuario" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGroupUser = async (req, res) => {
  try {
    const [update] = await GroupUserModel.update(req.body, {
      where: { group_user_id: req.params.group_user_id },
    });
    if (update) {
      const updatedGroupUser = await GroupUserModel.findByPk(
        req.params.group_user_id
      );
      res.json(updatedGroupUser);
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro el grupo usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const destroyGroupUser = async (req, res) => {
  try {
    const deletedGroupUser = await GroupUserModel.destroy({
      where: { group_user_id: req.params.group_user_id },
    });
    if (deletedGroupUser) {
      res.json({ message: "se elimino con exito el grupo usuario" });
    } else {
      return res
        .status(404)
        .json({ message: "no se encontro el grupo usario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
