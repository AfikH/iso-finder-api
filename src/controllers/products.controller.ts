import { NextFunction, Request, Response } from "express";
import { product, productInsert, productInsertSchema } from "@zod/schemas/product";
import productsService from "@services/products.service";
import ValidationError from "@errors/ValidationError";
import { ApiResponse } from "@customTypes/Response.type";

const get = async (req: Request, res: Response<ApiResponse<product[]>>, next: NextFunction) => {
  try {
    const products = await productsService.get();

    if (products.length <= 0) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req: Request<{ productId: string }>, res: Response<ApiResponse<product>>, next: NextFunction) => {
  try {
    const id = parseInt(req.params.productId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(product id).");

    const product = await productsService.getOneById(id);
    if (!product) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request<{}, {}, productInsert>, res: Response<ApiResponse<product>>, next: NextFunction) => {
  try {
    const productData = productInsertSchema.parse(req.body);

    const product = await productsService.createOne(productData);

    res.status(201).json({
      status: "success",
      message: "Product has been created succesfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneById = async (
  req: Request<{ productId: string }, {}, Partial<productInsert>>,
  res: Response<ApiResponse<product>>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.productId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(product id).");

    const productData = productInsertSchema.partial().parse(req.body);

    const product = await productsService.updateOneById(id, productData);

    res.status(201).json({
      status: "success",
      message: "Product has been updated succesfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getOneById, createOne, updateOneById };
