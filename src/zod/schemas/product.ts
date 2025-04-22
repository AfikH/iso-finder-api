import { createSelectSchema } from "drizzle-zod";
import { productsTable } from "@db/schema";

export const productSelectSchema = createSelectSchema(productsTable, {
  name: (schema) => schema.min(1).max(255),
});

export const productInsertSchema = productSelectSchema.omit({ id: true });

export type product = typeof productSelectSchema._type;
export type productInsert = typeof productInsertSchema._type;
