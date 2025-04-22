import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { companyCategoriesTable } from "@db/schema";
import { companyCategory, companyCategoryInsert } from "@zod/schemas/companyCategory";

const get = async (limit: number = 10, offset: number = 0): Promise<companyCategory[]> => {
  const companies = await db.select().from(companyCategoriesTable).limit(limit).offset(offset);
  return companies;
};

const getOneById = async (id: number): Promise<companyCategory | undefined> => {
  const [companyCategory] = await db.select().from(companyCategoriesTable).where(eq(companyCategoriesTable.id, id)).limit(1);
  return companyCategory;
};

const createOne = async (data: companyCategoryInsert): Promise<companyCategory> => {
  // TODO::validate data

  const [companyCategory] = await db.insert(companyCategoriesTable).values(data).returning();
  return companyCategory;
};

const updateOneById = async (id: number, data: Partial<companyCategoryInsert>): Promise<companyCategory> => {
  // TODO::validate data

  const [companyCategory] = await db.update(companyCategoriesTable).set(data).where(eq(companyCategoriesTable.id, id)).returning();
  return companyCategory;
};

const deleteOneById = async (id: number): Promise<void> => {
  await db.delete(companyCategoriesTable).where(eq(companyCategoriesTable.id, id));
};

export default { get, getOneById, createOne, updateOneById, deleteOneById };
