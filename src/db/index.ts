import { drizzle } from "drizzle-orm/node-postgres";
import mainConfig from "@configs/main.config";
import { DefaultLogger, LogWriter } from "drizzle-orm";
import logger from "@utils/logger.util";

class CustomLogWriter implements LogWriter {
  write(message: string) {
    logger.info("message");
  }
}

const customLogger = new DefaultLogger({ writer: new CustomLogWriter() });

export const db = () => {
  if (!mainConfig.db.url) {
    console.error("Missing DATABASE_URL env var.(pgsql)");
    throw new Error("Couldn't connect to database.");
  } else {
    return drizzle(mainConfig.db.url, { logger: customLogger });
  }
};
