import { NextFunction, Request, Response } from "express";
import { certification, certificationInsert, certificationInsertSchema } from "@zod/schemas/certification";
import certificationsService from "@services/certifications.service";
import { ApiResponse } from "@customTypes/Response.type";
import ValidationError from "@errors/ValidationError";

export const get = async (req: Request, res: Response<ApiResponse<certification[]>>, next: NextFunction) => {
  try {
    const certifications = await certificationsService.get();

    if (certifications.length <= 0) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req: Request<{ certificationId: string }>, res: Response<ApiResponse<certification>>, next: NextFunction) => {
  try {
    const id = parseInt(req.params.certificationId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(certification id).");

    const certification = await certificationsService.getOneById(id);
    if (!certification) {
      res.status(204).end();
      return;
    }

    res.status(200).json({
      status: "success",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request<{}, {}, certificationInsert>, res: Response<ApiResponse<certification>>, next: NextFunction) => {
  try {
    const certificationData = certificationInsertSchema.parse(req.body);

    const certification = await certificationsService.createOne(certificationData);

    res.status(201).json({
      status: "success",
      message: "Certification has been created succesfully.",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneById = async (
  req: Request<{ certificationId: string }, {}, Partial<certificationInsert>>,
  res: Response<ApiResponse<certification>>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.certificationId) || null;
    if (!id) throw new ValidationError(400, "Missing url parameter(certification id).");

    const certificationData = certificationInsertSchema.partial().parse(req.body);

    const certification = await certificationsService.updateOneById(id, certificationData);

    res.status(201).json({
      status: "success",
      message: "Certification has been updated succesfully.",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, getOneById, createOne, updateOneById };
