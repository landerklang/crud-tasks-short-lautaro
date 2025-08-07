import morgan from "morgan";
import "dotenv/config";
import express from "express";
import { startOn } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import tasksRoutes from "./src/routes/task.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
/* sequelize.authenticate(); */

app.use("/api", userRoutes);
app.use("/api", tasksRoutes);

app.listen(PORT, async () => {
  await startOn();

  console.log(`se realizon una conexion exito con el puerto ${PORT}`);
});
