import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  user_id: int().autoincrement().primaryKey(),
  auth_server_id: varchar({ length: 32 }).unique().notNull(),
});
