import GroupModel from "../models/group.model.js";

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
    res.status(201).json("se creo el grupo", created);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
