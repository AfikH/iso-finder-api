import { createSelectSchema } from "drizzle-zod";
import { territoriesTable } from "@db/schema";

export const territorySelectSchema = createSelectSchema(territoriesTable, {
  name: (schema) => schema.min(1).max(200),
  code: (schema) => schema.length(2),
});

export const territoryInsertSchema = territorySelectSchema.omit({ id: true });

export type territory = typeof territorySelectSchema._type;
export type territoryInsert = typeof territoryInsertSchema._type;
