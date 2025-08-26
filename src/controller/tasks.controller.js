import TasksModel from "../models/task.model.js";
import UserModel from "../models/user.model.js";

export const createTasks = async (req, res) => {
  const { title, description, isComplete, user_id } = req.body;

  if (user_id === undefined) {
    return res.status(400).json({ message: "no se permite campos vacios" });
  }
  const iduser = await UserModel.findByPk(user_id);
  if (iduser === null) {
    return res.status(400).json({ message: "no existe un usuario con ese id" });
  }
  // if (user_id === req.params.id) {
  //   return res.status(401).json({ message: "no existe un usuario con ese id" });
  // }

  if (title === "") {
    return res.status(400).json({ Message: "no se permiten campos vacios" });
  }
  const titletab = await TasksModel.findOne({ where: { title } });
  if (titletab) {
    return res.status(400).json({ message: "ya se utilizo este titulo" });
  }
  ///tambien puede ser asi if (title.length > 100)
  const titlelengt = title.length;
  if (titlelengt > 100) {
    return res
      .status(401)
      .json({ message: "no se permiten titulos mayores a 100 caracteres" });
  }
  if (description === "") {
    return res.status(400).json({ message: "no se permiten campos vacios" });
  }
  const descriptionlengt = description.length;
  if (descriptionlengt > 100) {
    return res.status(400).json({
      message: "no se permiten descripciones mayores a 100 caracteres",
    });
  }
  if (isComplete === "") {
    return res.status(400).json({ message: "no se permiten campos vacios" });
  }
  if (typeof isComplete !== "boolean") {
    return res
      .status(400)
      .json({ message: "solo se permiten datos verdadero o falso" });
  }
  try {
    const task = await TasksModel.create({
      title,
      description,
      isComplete,
      user_id,
    });
    // si al crear coloco req.body tendra en cuenta todo lo que recibo del body,
    // en cambio si coloco solo las propiedades que desesctruturo, ignoro completamente otros datos que pueda recibir
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await TasksModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: { exclude: ["password", "email", "user_id"] },
        },
      ],
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const tasks = await TasksModel.findByPk(req.params.task_id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: { exclude: ["password", "email"] },
        },
      ],
    });
    if (tasks) res.json(tasks);
    else res.status(404).json({ message: "no se a encontrado la tarea" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { title } = req.body;

  const titleTab = await TasksModel.findOne({ where: { title } });
  if (titleTab) {
    return res
      .status(400)
      .json({ message: "ya existe un campo con ese titulo" });
  }
  try {
    const [update] = await TasksModel.update(req.body, {
      where: { task_id: req.params.task_id },
    });
    if (update) {
      const updatedtask = await TasksModel.findByPk(req.params.task_id);
      res.json(updatedtask);
    } else {
      res.status(404).json({ message: "no se encontro la tarea " });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await TasksModel.destroy({
      where: { task_id: req.params.task_id },
    });
    if (deleted) {
      res.status(201).json({ message: "se elimino la tarea de forma exitosa" });
    } else return res.status(404).json({ message: "no se encontro la tarea" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
