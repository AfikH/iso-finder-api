import { createSelectSchema } from "drizzle-zod";
import { companiesTable } from "@db/schema";

export const companySelectSchema = createSelectSchema(companiesTable, {
  address: (schema) => schema.min(1).max(255),
  postalCode: (schema) => schema.min(2).max(12),
  phoneNumber: (schema) =>
    schema
      .min(5)
      .max(20)
      .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
  name: (schema) => schema.min(1).max(60),
});

export const companyInsertSchema = companySelectSchema.omit({ id: true });

export type company = typeof companySelectSchema._type;
export type companyInsert = typeof companyInsertSchema._type;
