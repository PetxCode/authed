import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
dotenv.config();

const port: string = process.env.PORT as string;
const app: Application = express();

app.use(express.json());
app.use(cors());

mainApp(app);

app.listen(parseInt(port), () => {
  dbConfig();
});
