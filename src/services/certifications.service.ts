import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { certificationsTable } from "@db/schema";
import { certification, certificationInsert } from "@zod/schemas/certification";

const get = async (limit: number = 10, offset: number = 0): Promise<certification[]> => {
  const certifications = await db.select().from(certificationsTable).limit(limit).offset(offset);
  return certifications;
};

const getOneById = async (id: number): Promise<certification | undefined> => {
  const [certification] = await db.select().from(certificationsTable).where(eq(certificationsTable.id, id)).limit(1);
  return certification;
};

const createOne = async (data: certificationInsert): Promise<certification> => {
  // TODO::validate data

  const [certification] = await db.insert(certificationsTable).values(data).returning();
  return certification;
};

const updateOneById = async (id: number, data: Partial<certificationInsert>): Promise<certification> => {
  // TODO::validate data

  const [certification] = await db.update(certificationsTable).set(data).where(eq(certificationsTable.id, id)).returning();
  return certification;
};

const deleteOneById = async (id: number): Promise<void> => {
  await db.delete(certificationsTable).where(eq(certificationsTable.id, id));
};

export default { get, getOneById, createOne, updateOneById, deleteOneById };
