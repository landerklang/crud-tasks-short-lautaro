import Task from "../models/task.models.js";

export const createTasks = async (req, res) => {
  const { title, description, isComplete } = req.body;

  if (title === "" || title === undefined) {
    return res.status(401).json({ Message: "no se permiten campos vacios" });
  }
  const titletab = await Task.findOne({ where: { title } });
  if (titletab) {
    return res.status(401).json({ message: "ya se utilizo este titulo" });
  }

  if (description === "") {
    return res.status(401).json({ message: "no se permiten campos vacios" });
  }
  if (isComplete === "") {
    return res.status(401).json({ message: "no se permiten campos vacios" });
  }
  if (typeof isComplete !== "boolean") {
    return res
      .status(401)
      .json({ message: "solo se permiten datos verdadero o falso" });
  }
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const tasks = await Task.findByPk(req.params.id);
    if (tasks) res.json(tasks);
    else res.status(404).json({ message: "no se a encontrado la tarea" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { title } = req.body;

  const titleTab = await Task.findOne({ where: { title } });
  if (titleTab) {
    return res
      .status(500)
      .json({ message: "ya existe un campo con ese nombre" });
  }
  try {
    const [update] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const updatedtask = await Task.findByPk(req.params.id);
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
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(201).json({ message: "se elimino la tarea de forma exitosa" });
    } else return res.status(404).json({ message: "no se encontro la tarea" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
