import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { companiesTable } from "@db/schema";
import { company, companyInsert } from "@zod/schemas/company";

const get = async (limit: number = 10, offset: number = 0): Promise<company[]> => {
  const companies = await db.select().from(companiesTable).limit(limit).offset(offset);
  return companies;
};

const getOneById = async (id: number): Promise<company | undefined> => {
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, id)).limit(1);
  return company;
};

const createOne = async (data: companyInsert): Promise<company> => {
  const [company] = await db.insert(companiesTable).values(data).returning();
  return company;
};

const updateOneById = async (id: number, data: Partial<companyInsert>): Promise<company> => {
  // TODO::validate data

  const [company] = await db.update(companiesTable).set(data).where(eq(companiesTable.id, id)).returning();
  return company;
};

const deleteOneById = async (id: number): Promise<void> => {
  await db.delete(companiesTable).where(eq(companiesTable.id, id));
};

export default { get, getOneById, createOne, updateOneById, deleteOneById };
