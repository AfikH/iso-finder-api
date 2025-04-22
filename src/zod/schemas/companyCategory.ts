import { createSelectSchema } from "drizzle-zod";
import { companyCategoriesTable } from "@db/schema";

export const companyCategorySelectSchema = createSelectSchema(companyCategoriesTable, {
  name: (schema) => schema.min(1).max(30),
});

export const companyCategoryInsertSchema = companyCategorySelectSchema.omit({ id: true });

export type companyCategory = typeof companyCategorySelectSchema._type;
export type companyCategoryInsert = typeof companyCategoryInsertSchema._type;
