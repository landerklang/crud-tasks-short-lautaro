import ValidCodeModel from "../models/valid_code.model.js";
import UserModel from "../models/user.model.js";

export const createdValidCode = async (req, res) => {
  const { code, telefono, user_id } = req.body;

  if (code === "") {
    return res.status(500).json({ message: "no se permiten campos vacios" });
  }
  if (telefono === "") {
    return res.status(500).json({ mesage: "no se permiten campos vacios" });
  }
  const iduser = await UserModel.findByPk(user_id);
  if (!iduser) {
    return res.status(500).json({
      message: "no se encontro ningun usuario que corresponda a este codigo",
    });
  }
  try {
    const createdcode = await ValidCodeModel.create({
      code,
      telefono,
      user_id,
    });
    res.status(201).json(createdcode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getValidCode = async (req, res) => {
  try {
    const getvalidcode = await ValidCodeModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: "person",
          attributes: { exclude: ["email", "password"] },
        },
      ],
    });
    if (getvalidcode) res.json(getAllValidcode);
    else return res.status(404).json({ message: "no se encontro el codigo" });
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

export const getAllValidCode = async (req, res) => {
  try {
    const getvalidscode = await ValidCodeModel.findAll({
      include: [
        {
          model: UserModel,
          as: "person",
          attributes: { exclude: ["email", "password", "id"] },
        },
      ],
    });
    res.json(getvalidscode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateValidCode = async (req, res) => {
  try {
    const [update] = await ValidCodeModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updateCode = await ValidCodeModel.findByPk(req.params.id);
      res
        .status(updateCode)
        .json({ message: "se actualizo el codigo de validacion con exito" });
    } else
      return res
        .status(404)
        .json({ message: "no se encontro el codigo de validacion" });
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

export const deletedValidCode = async (req, res) => {
  try {
    const deletedcode = await ValidCodeModel.destroy({
      where: { id: req.params.id },
    });
    if (deletedcode)
      res.json({ message: "se elimino el codigo de validacion" });
    else
      return res
        .status(404)
        .json({ message: "no se encontro el codigo de validacion" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
