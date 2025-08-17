import morgan from "morgan";
import "dotenv/config";
import express from "express";
import { startOn } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import tasksRoutes from "./src/routes/task.routes.js";
import router_valid_code from "./src/routes/valid_code.routes.js";
import groupsRoutes from "./src/routes/groups.routes.js";
import groupsUserRoutes from "./src/routes/groups_User.routes.js";
// import User from "./src/models/user.models.js";
// import Task from "./src/models/task.models.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
//no se nesesita si ya en el archivo database colocaste sync
/* sequelize.authenticate(); */

app.use("/api", userRoutes);
app.use("/api", tasksRoutes);
app.use("/api", router_valid_code);
app.use("/api", groupsRoutes);
app.use("/api", groupsUserRoutes);
// app.get("/task", async (req, res) => {
//   const tasks = await tasks.findAll({
//     attributes: ["id", "title", "description", "isComplete"], //atributos que quiero mostrar
//     attributes: {
//       exclude: ["createdAt", "updatedAt"], //atributos que quiero excluir
//     },
//     include: [
//       {
//         model: User,
//         as: "author", //alias para la relacion
//       },
//     ],
//   });
//   res.json(tasks);
// });

app.listen(PORT, async () => {
  await startOn();

  console.log(`se realizon una conexion exito con el puerto ${PORT}`);
});
