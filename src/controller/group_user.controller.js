import GroupUserModel from "../models/group_user.model.js";
import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";

export const create_Group_User = async (req, res) => {
  const { user_id, group_id, group_user_id } = req.body;
  if (user_id === "" || group_id === "") {
    return res.status(400).json({
      message: "debe existir un usuario y un grupo para crear el campo ",
    });
  }
  const iduser = await UserModel.findByPk(user_id);
  if (iduser === null) {
    return res.status(404).json({ message: "no existe un usuario con ese id" });
  }
  const idgroup = await GroupModel.findByPk(group_id);
  if (idgroup === null) {
    return res.status(404).json({ message: "no existen un grupo con ese id" });
  }
  const idgrouptab = await GroupUserModel.findOne({ where: { group_id } });
  const idusertab = await UserModel.findOne({ where: { user_id } });
  if (idusertab && idgrouptab) {
    return res
      .status(400)
      .json({ message: "ya existe un grupo y usuario con ese id" });
  }
  try {
    const crear = await GroupUserModel.create({
      user_id,
      group_id,
      group_user_id,
    });
    res.status(201).json(crear);
  } catch (error) {
    res.status(500).json({ message: "no se pudo crear " });
  }
};

export const getAllGroupsUser = async (req, res) => {
  try {
    const groupuser = await GroupUserModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: { exclude: ["passwo", "email"] },
        },
        {
          model: GroupModel,
          as: "group",
          attributes: { exclude: ["nameGroup", "descripcion"] },
        },
      ],
    });
    res.json(groupuser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "no se pudo traer todos los grupos de usuario" });
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
        .json({ message: "no se encontro el grupo y usuario" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "no se pudo traer al grupo y al usuario " });
  }
};

export const updateGroupUser = async (req, res) => {
  try {
    // const idgrouptab = await GroupUserModel.findOne({ where: { group_id } });
    // const idusertab = await UserModel.findOne({ where: { user_id } });
    // if (idusertab && idgrouptab) {
    //   return res
    //     .status(400)
    //     .json({ message: "ya existe un grupo y usuario con ese id" });
    // }
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
