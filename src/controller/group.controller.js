import GroupModel from "../models/group.model.js";
import UserModel from "../models/user.model.js";

export const createGroup = async (req, res) => {
  const { nameGroup, descripcion } = req.body;
  if (nameGroup === "") {
    return res.status(500).json({ message: "no se permiten campos vacios" });
  }
  if (descripcion === "") {
    return res.status(500), json({ message: "no se permiten campos vacios" });
  }
  try {
    const created = await GroupModel.create({ nameGroup, descripcion });
    res.status(201).json(created, " Grupo creado con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const getGroup = await GroupModel.findByPk(req.body.id, {
      include: [
        {
          Model: UserModel,
          as: "users",
          attributes: { exclude: ["password", "email"] },
        },
      ],
    });
    if (getGroup) res.json(getGroup);
    else return res.status(404).json({ message: "no se encontro al grupo" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ erroR: error.message });
  }
};

export const updatedGroup = async (req, res) => {
  try {
    const [update] = await GroupModel.update(req.params, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatedgroup = await GroupModel.findByPk(req.params.id);
      res.json(updatedgroup);
    } else return res.status(404).json({ message: "no se encontro al grupo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletedGroup = async (req, res) => {
  try {
    const deleted = await GroupModel.destroy({
      where: { id: res.params.id },
    });
    if (deleted) res.json({ message: "se elimino con exito al grupo" });
    else return res.status(404).json({ message: "no se encontro el grupo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
