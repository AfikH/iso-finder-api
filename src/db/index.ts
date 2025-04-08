import mainConfig from "@configs/main.config";
import { drizzle } from "drizzle-orm/mysql2";

const db = () => {
  if (!mainConfig.db.url) {
    console.error("Missing DATABASE_URL env var.(mysql)");
    throw new Error("Couldn't connect to database.");
  } else {
    return drizzle(mainConfig.db.url);
  }
};
