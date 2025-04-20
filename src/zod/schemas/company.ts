import { createSelectSchema } from "drizzle-zod";
import { companies } from "@db/schema";

export const companySelectSchema = createSelectSchema(companies, {
  address: (schema) => schema.min(1).max(255),
  postalCode: (schema) => schema.min(2).max(12),
  phoneNumber: (schema) =>
    schema
      .min(5)
      .max(20)
      .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
  certifications: (schema) => schema.array(),
});

export const companyInsertSchema = companySelectSchema.omit({ id: true });

export type companyCategory = typeof companySelectSchema._type;
export type companyCategoryInsert = typeof companyInsertSchema._type;
