import { defineConfig } from "drizzle-kit";
import mainConfig from "./src/configs/main.config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: mainConfig.db.url!,
  },
});
