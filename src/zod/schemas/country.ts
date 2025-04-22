import { createSelectSchema } from "drizzle-zod";
import { countriesTable } from "@db/schema";

export const countrySelectSchema = createSelectSchema(countriesTable, {
  name: (schema) => schema.min(2).max(60),
  code: (schema) => schema.length(2),
});

export const countryInsertSchema = countrySelectSchema.omit({ id: true });

export type country = typeof countrySelectSchema._type;
export type countryInsert = typeof countryInsertSchema._type;
