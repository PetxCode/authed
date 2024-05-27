import { Application, Request, Response } from "express";
import user from "./router/userRouter";
export const mainApp = (app: Application) => {
  try {
    app.set("view engine", "ejs");
    app.use("/", user);

    app.use("/ejs", (req: Request, res: Response) => {
      try {
        const user = {
          name: "Peter",
          score: Math.floor(Math.random() * 1000),
        };
        return res.render("index", user);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
