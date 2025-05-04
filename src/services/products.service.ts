import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { productsTable } from "@db/schema";
import { product, productInsert } from "@zod/schemas/product";

const get = async (limit: number = 10, offset: number = 0): Promise<product[]> => {
  const companies = await db().select().from(productsTable).limit(limit).offset(offset);
  return companies;
};

const getOneById = async (id: number): Promise<product | undefined> => {
  const [product] = await db().select().from(productsTable).where(eq(productsTable.id, id)).limit(1);
  return product;
};

const createOne = async (data: productInsert): Promise<product> => {
  // TODO::validate data

  const [product] = await db().insert(productsTable).values(data).returning();
  return product;
};

const updateOneById = async (id: number, data: Partial<productInsert>): Promise<product> => {
  // TODO::validate data

  const [product] = await db().update(productsTable).set(data).where(eq(productsTable.id, id)).returning();
  return product;
};

const deleteOneById = async (id: number): Promise<void> => {
  await db().delete(productsTable).where(eq(productsTable.id, id));
};

export default { get, getOneById, createOne, updateOneById, deleteOneById };
