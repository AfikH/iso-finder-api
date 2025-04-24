import { NextFunction, Request, Response } from "express";
import ValidationError from "@errors/ValidationError";
import companyCategoriesService from "@services/companyCategories.service";
import { companyCategory, companyCategoryInsert, companyCategoryInsertSchema } from "@zod/schemas/companyCategory";
import { ApiResponse } from "@customTypes/Response.type";

const get = async (req: Request, res: Response<ApiResponse<companyCategory[]>>, next: NextFunction) => {
  try {
    const companyCategories = await companyCategoriesService.get();

    if (companyCategories.length <= 0) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: companyCategories,
    });
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req: Request<{ companyCategoryId: string }>, res: Response<ApiResponse<companyCategory>>, next: NextFunction) => {
  try {
    const id = parseInt(req.params.companyCategoryId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(category id).");

    const companyCategory = await companyCategoriesService.getOneById(id);
    if (!companyCategory) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: companyCategory,
    });
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request<{}, {}, companyCategoryInsert>, res: Response<ApiResponse<companyCategory>>, next: NextFunction) => {
  try {
    const companyCategoryData = companyCategoryInsertSchema.parse(req.body);

    const companyCategory = await companyCategoriesService.createOne(companyCategoryData);

    res.status(201).json({
      status: "success",
      message: "Category has been created succesfully.",
      data: companyCategory,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneById = async (
  req: Request<{ companyCategoryId: string }, {}, Partial<companyCategoryInsert>>,
  res: Response<ApiResponse<companyCategory>>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.companyCategoryId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(category id).");

    const companyCategoryData = companyCategoryInsertSchema.partial().parse(req.body);

    const companyCategory = await companyCategoriesService.updateOneById(id, companyCategoryData);

    res.status(201).json({
      status: "success",
      message: "Category has been updated succesfully.",
      data: companyCategory,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getOneById, createOne, updateOneById };
