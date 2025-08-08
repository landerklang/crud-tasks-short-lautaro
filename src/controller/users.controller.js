import User from "../models/user.models.js";

export const createdUsers = async (req, res) => {
  const { name, email, password } = req.body;

  if (name === "") {
    res.status(401).json({ message: "no se permiten campos vacios" });
  }
  if (typeof name !== "string") {
    return res
      .status(401)
      .json({ message: "solo se permiten datos de tipo string " });
  }
  const namelength = name.length;
  if (namelength > 100) {
    return res
      .status(401)
      .json({ message: "no se permiten mas de 100 caracteres en el nombre" });
  }
  if (email === "") {
    return res.status(401).json({ message: "no se permiten campos vacios" });
  }
  const emailength = email.length;
  if (emailength > 100) {
    return res
      .status(401)
      .json({ message: "no se permiten mas de 100 caracteres en el gmail" });
  }

  if (password === "") {
    return res.status(401).json({ message: "no se permiten campos vacios" });
  }
  const passwordlength = password.length;
  if (passwordlength > 100) {
    return res.status(401).json({
      message:
        "no se permiten en los campos de contraseña mas de 100 caracteres",
    });
  }
  try {
    const user = await User.create(req.body);
    // console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: "no se encontro al usuario" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUsers = async (req, res) => {
  const { email } = req.body;

  const emailTab = await User.findOne({ where: { email } });
  if (emailTab) {
    return res.json({ message: "ya existe un usuario con el mismo gmail" });
  }
  try {
    const [update] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatedUsers = await User.findByPk(req.params.id);
      res.json(updatedUsers);
    } else {
      res.status(404).json({ message: "usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "se elimino usuario de forma exitosa" });
    } else return res.status(404).json({ message: "usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
