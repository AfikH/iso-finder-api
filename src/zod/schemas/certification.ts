import { createSelectSchema } from "drizzle-zod";
import { certificationsTable } from "@db/schema";

export const certificationSelectSchema = createSelectSchema(certificationsTable, {
  name: (schema) => schema.min(1).max(255),
});

export const certificationInsertSchema = certificationSelectSchema.omit({ id: true });

export type certification = typeof certificationSelectSchema._type;
export type certificationInsert = typeof certificationInsertSchema._type;
