import "dotenv/config";

import { closeDb, db } from "@db/index";
import { app } from "@app";
import mainConfig from "@configs/main.config";
import AppError from "@errors/AppError";

try {
  db(); // ensure DB is initialized
  app.listen(mainConfig.app.port, (error) => {
    if (error) throw new AppError(500, "Failed to run app");
    console.log(`App is running on port: ${mainConfig.app.port}`);
  });
} catch (error) {
  console.error("Failed to start app:", error);
}

// Graceful shutdown handling
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await closeDb(); // Close DB connections gracefully
  process.exit(0); // Exit the process with success code
});

process.on("SIGTERM", async () => {
  await closeDb(); // Close DB connections gracefully
  process.exit(0); // Exit the process with success code
});
