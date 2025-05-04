import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { DefaultLogger, LogWriter } from "drizzle-orm";

import mainConfig from "@configs/main.config";
import logger from "@utils/logger.util";

class CustomLogWriter implements LogWriter {
  write(message: string) {
    logger.info(message);
  }
}

const customLogger = new DefaultLogger({ writer: new CustomLogWriter() });

let pool: Pool | null = null;
let dbInstance: NodePgDatabase | null = null;

export const db = (): NodePgDatabase => {
  if (dbInstance) return dbInstance;

  if (!mainConfig.db.url) {
    logger.error("Missing DATABASE_URL env var (pgsql)");
    throw new Error("Missing DATABASE_URL environment variable.");
  }

  pool = new Pool({ connectionString: mainConfig.db.url });
  dbInstance = drizzle(pool, { logger: customLogger });

  logger.info("Database initialized.");
  return dbInstance;
};

export const closeDb = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    logger.info("Database connection pool closed.");
    pool = null;
    dbInstance = null;
  }
};
