import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { productCategoriesTable } from "@db/schema";
import { productCategory, productCategoryInsert } from "@zod/schemas/productCategory";

const get = async (limit: number = 10, offset: number = 0): Promise<productCategory[]> => {
  const companies = await db().select().from(productCategoriesTable).limit(limit).offset(offset);
  return companies;
};

const getOneById = async (id: number): Promise<productCategory | undefined> => {
  const [productCategory] = await db().select().from(productCategoriesTable).where(eq(productCategoriesTable.id, id)).limit(1);
  return productCategory;
};

const createOne = async (data: productCategoryInsert): Promise<productCategory> => {
  // TODO::validate data

  const [productCategory] = await db().insert(productCategoriesTable).values(data).returning();
  return productCategory;
};

const updateOneById = async (id: number, data: Partial<productCategoryInsert>): Promise<productCategory> => {
  // TODO::validate data

  const [productCategory] = await db().update(productCategoriesTable).set(data).where(eq(productCategoriesTable.id, id)).returning();
  return productCategory;
};

const deleteOneById = async (id: number): Promise<void> => {
  await db().delete(productCategoriesTable).where(eq(productCategoriesTable.id, id));
};

export default { get, getOneById, createOne, updateOneById, deleteOneById };
