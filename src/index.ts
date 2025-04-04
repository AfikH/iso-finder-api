import express, { Request, Response } from "express";
import "dotenv/config";

import mainConfig from "@configs/main.config";
import errorHandler from "@middlewares/errorHandler.middleware";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hay");
});

app.use(errorHandler);

app.listen(mainConfig.app.port, (error) => {
  if (error) return console.error(`Failed to run app:`, error);
  console.log(`App is running on port: ${mainConfig.app.port}`);
});
