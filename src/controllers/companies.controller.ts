import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { companiesTable } from "@db/schema";
import { company, companyInsert, companyInsertSchema } from "@zod/schemas/company";
import companiesService from "@services/companies.service";
import { NextFunction, Request, Response } from "express";
import ValidationError from "@errors/ValidationError";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await companiesService.get();

    if (companies.length <= 0) return res.status(204).end();

    return res.status(200).json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(company id)");

    const company = await companiesService.getOneById(id);
    if (!company) return res.status(204).end();

    return res.status(200).json({
      status: "success",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const createOne = async (req: Request<{}, {}, companyInsert>, res: Response, next: NextFunction) => {
  try {
    const companyData = companyInsertSchema.parse(req.body);

    const company = await companiesService.createOne(companyData);

    return res.status(201).json({
      status: "success",
      message: "Company has been created succesfully.",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOneById = async (id: number, data: Partial<companyInsert>): Promise<company> => {
  // TODO::validate data

  const [company] = await db.update(companiesTable).set(data).where(eq(companiesTable.id, id)).returning();
  return company;
};

export const deleteOneById = async (id: number): Promise<void> => {
  await db.delete(companiesTable).where(eq(companiesTable.id, id));
};
