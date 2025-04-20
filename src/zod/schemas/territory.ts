import { createSelectSchema } from "drizzle-zod";
import { territories } from "@db/schema";

export const territorySelectSchema = createSelectSchema(territories, {
  name: (schema) => schema.min(1).max(200),
  code: (schema) => schema.length(2),
});

export const territoryInsertSchema = territorySelectSchema.omit({ id: true });

export type territory = typeof territorySelectSchema._type;
export type territoryInsert = typeof territoryInsertSchema._type;
