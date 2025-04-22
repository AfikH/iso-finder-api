import { createSelectSchema } from "drizzle-zod";
import { citiesTable } from "@db/schema";

export const citySelectSchema = createSelectSchema(citiesTable, {
  name: (schema) => schema.min(1).max(200),
  county: (schema) => schema.min(1).max(200),
});

export const cityInsertSchema = citySelectSchema.omit({ id: true });

export type city = typeof citySelectSchema._type;
export type cityInsert = typeof cityInsertSchema._type;
