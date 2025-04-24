import { NextFunction, Request, Response } from "express";
import ValidationError from "@errors/ValidationError";
import productCategoriesService from "@services/productCategories.service";
import { productCategory, productCategoryInsert, productCategoryInsertSchema } from "@zod/schemas/productCategory";
import { ApiResponse } from "@customTypes/Response.type";

const get = async (req: Request, res: Response<ApiResponse<productCategory[]>>, next: NextFunction) => {
  try {
    const productCategories = await productCategoriesService.get();

    if (productCategories.length <= 0) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: productCategories,
    });
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req: Request<{ productCategoryId: string }>, res: Response<ApiResponse<productCategory>>, next: NextFunction) => {
  try {
    const id = parseInt(req.params.productCategoryId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(category id).");

    const productCategory = await productCategoriesService.getOneById(id);
    if (!productCategory) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: productCategory,
    });
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request<{}, {}, productCategoryInsert>, res: Response<ApiResponse<productCategory>>, next: NextFunction) => {
  try {
    const productCategoryData = productCategoryInsertSchema.parse(req.body);

    const productCategory = await productCategoriesService.createOne(productCategoryData);

    res.status(201).json({
      status: "success",
      message: "Category has been created succesfully.",
      data: productCategory,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneById = async (
  req: Request<{ productCategoryId: string }, {}, Partial<productCategoryInsert>>,
  res: Response<ApiResponse<productCategory>>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.productCategoryId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(category id).");

    const productCategoryData = productCategoryInsertSchema.partial().parse(req.body);

    const productCategory = await productCategoriesService.updateOneById(id, productCategoryData);

    res.status(201).json({
      status: "success",
      message: "Category has been updated succesfully.",
      data: productCategory,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getOneById, createOne, updateOneById };
