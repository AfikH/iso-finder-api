import { DefaultLogger, LogWriter } from "drizzle-orm";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import mainConfig from "@configs/main.config";
import logger from "@utils/logger.util";

class CustomLogWriter implements LogWriter {
  write(message: string) {
    logger.info("message");
  }
}

const customLogger = new DefaultLogger({ writer: new CustomLogWriter() });

const createDb = () => {
  if (!mainConfig.db.url) {
    logger.error("Missing DATABASE_URL env var.(pgsql)");
    throw new Error("Couldn't connect to database.");
  } else {
    return drizzle(mainConfig.db.url, { logger: customLogger });
  }
};

export const db: NodePgDatabase = createDb();
