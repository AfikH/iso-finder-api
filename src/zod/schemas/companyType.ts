import { createSelectSchema } from "drizzle-zod";
import { companyTypes } from "@db/schema";

export const companyTypeSelectSchema = createSelectSchema(companyTypes, {
  name: (schema) => schema.min(1).max(30),
});

export const companyTypeInsertSchema = companyTypeSelectSchema.omit({ id: true });

export type companyType = typeof companyTypeSelectSchema._type;
export type companyTypeInsert = typeof companyTypeInsertSchema._type;
