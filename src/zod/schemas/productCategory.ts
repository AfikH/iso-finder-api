import { createSelectSchema } from "drizzle-zod";
import { productCategories } from "@db/schema";

export const productCategorySelectSchema = createSelectSchema(productCategories, {
  name: (schema) => schema.min(1).max(255),
});

export const productCategoryInsertSchema = productCategorySelectSchema.omit({ id: true });

export type productCategory = typeof productCategorySelectSchema._type;
export type productCategoryInsert = typeof productCategoryInsertSchema._type;
