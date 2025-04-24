import { NextFunction, Request, Response } from "express";
import { company, companyInsert, companyInsertSchema } from "@zod/schemas/company";
import companiesService from "@services/companies.service";
import ValidationError from "@errors/ValidationError";
import { ApiResponse } from "@customTypes/Response.type";

const get = async (req: Request, res: Response<ApiResponse<company[]>>, next: NextFunction) => {
  try {
    const companies = await companiesService.get();

    if (companies.length <= 0) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req: Request<{ companyId: string }>, res: Response<ApiResponse<company>>, next: NextFunction) => {
  try {
    const id = parseInt(req.params.companyId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(company id).");

    const company = await companiesService.getOneById(id);
    if (!company) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request<{}, {}, companyInsert>, res: Response<ApiResponse<company>>, next: NextFunction) => {
  try {
    const companyData = companyInsertSchema.parse(req.body);

    const company = await companiesService.createOne(companyData);

    res.status(201).json({
      status: "success",
      message: "Company has been created succesfully.",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneById = async (
  req: Request<{ companyId: string }, {}, Partial<companyInsert>>,
  res: Response<ApiResponse<company>>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.companyId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(company id).");

    const companyData = companyInsertSchema.partial().parse(req.body);

    const company = await companiesService.updateOneById(id, companyData);

    res.status(201).json({
      status: "success",
      message: "Company has been updated succesfully.",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getOneById, createOne, updateOneById };
