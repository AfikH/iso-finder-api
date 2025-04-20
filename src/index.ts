import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import "dotenv/config";

import mainConfig from "@configs/main.config";
import errorHandler from "@middlewares/errorHandler.middleware";
import requestLogger from "@middlewares/requestLogger.middleware";

const app = express();

// request logging middleware
app.use(requestLogger);

// protection layer
app.use(helmet());
app.use(cors());
app.use(hpp());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hay");
});

// error handling middleware
app.use(errorHandler);

app.listen(mainConfig.app.port, (error) => {
  if (error) return console.error(`Failed to run app:`, error);
  console.log(`App is running on port: ${mainConfig.app.port}`);
});
