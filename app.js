import morgan from "morgan";
import { sequelize } from "./src/config/database";
import dotenv from "dotenv";
import express from "express";
import { starOn } from "./src/config/database";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json);
app.use(morgan("dev"));
sequelize.authenticate();

app.listen(PORT, async () => {
  await starOn();
  console.log(`se realizon una conexion exito con el puerto${PORT}`);
});
