import errorBreakdown from "@utils/errorBreakdown.util";
import { NextFunction, Request, Response } from "express";

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = errorBreakdown(error);
  res.status(status).json({ message });
};

export default errorHandler;
