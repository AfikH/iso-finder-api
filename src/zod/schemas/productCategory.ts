import { createSelectSchema } from "drizzle-zod";
import { productCategoriesTable } from "@db/schema";

export const productCategorySelectSchema = createSelectSchema(productCategoriesTable, {
  name: (schema) => schema.min(1).max(255),
});

export const productCategoryInsertSchema = productCategorySelectSchema.omit({ id: true });

export type productCategory = typeof productCategorySelectSchema._type;
export type productCategoryInsert = typeof productCategoryInsertSchema._type;
