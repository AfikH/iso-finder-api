import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { certificationsTable } from "@db/schema";
import { certification, certificationInsert } from "@zod/schemas/certification";
import { NextFunction, Request, Response } from "express";
import certificationsService from "@services/certifications.service";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certifications = await certificationsService.get();

    if (certifications.length <= 0) return res.status(204).end();

    return res.status(200).json({
      status: "success",
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneById = async (id: number): Promise<certification | undefined> => {
  const [certification] = await db.select().from(certificationsTable).where(eq(certificationsTable.id, id)).limit(1);
  return certification;
};

export const createOne = async (data: certificationInsert): Promise<certification> => {
  // TODO::validate data

  const [certification] = await db.insert(certificationsTable).values(data).returning();
  return certification;
};

export const updateOneById = async (id: number, data: Partial<certificationInsert>): Promise<certification> => {
  // TODO::validate data

  const [certification] = await db.update(certificationsTable).set(data).where(eq(certificationsTable.id, id)).returning();
  return certification;
};

export const deleteOneById = async (id: number): Promise<void> => {
  await db.delete(certificationsTable).where(eq(certificationsTable.id, id));
};
