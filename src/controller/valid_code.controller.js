import Valid_code from "../models/valid_code.models.js";
import User from "../models/user.models.js";

export const createdValidCode = async (req, res) => {
  const { code, telefono, user_id } = req.body;

  if (code === "") {
    return res.status(500).json({ message: "no se permiten campos vacios" });
  }
  if (telefono === "") {
    return res.status(500).json({ mesage: "no se permiten campos vacios" });
  }
  const iduser = await User.findByPk(user_id);
  if (!iduser) {
    return res.status(500).json({
      message: "no se encontro ningun usuario que corresponda a este codigo",
    });
  }
  try {
    const createdcode = await Valid_code.create({ code, telefono, user_id });
    res.status(201).json(createdcode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllValidcode = async (req, res) => {
  try {
    const getvalidscode = await Valid_code.findAll({
      include: [
        {
          model: User,
          as: "person",
          attributes: { exclude: ["email", "password"] },
        },
      ],
    });
    res.json(getvalidscode);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};
