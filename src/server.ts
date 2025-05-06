import "dotenv/config";

import { Server } from "http";
import { closeDb, db } from "@db/index";
import { app } from "@app";
import mainConfig from "@configs/main.config";
import logger from "@utils/logger.util";

let server: Server;

const startApp = async () => {
  try {
    await db();
    logger.info("Database initialized.");

    server = app.listen(mainConfig.app.port, (error) => {
      if (error) {
        logger.error("Failed to start the server:", error);
        process.exit(1);
        return;
      }
      logger.info(`App is running on port: ${mainConfig.app.port}`);
    });
  } catch (error) {
    logger.error("Failed to initialize DB:", error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  logger.info("Shutting down...");
  if (server) {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          logger.error("Error during server shutdown:", err);
          reject(err);
        } else {
          logger.info("Server closed.");
          resolve();
        }
      });
    });
  }
  await closeDb();
  logger.info("Database connection closed.");
  process.exit(0);
};

startApp();

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
