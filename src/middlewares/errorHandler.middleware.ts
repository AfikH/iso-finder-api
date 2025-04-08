import errorBreakdown from "@utils/errorBreakdown.util";
import { Request, Response } from "express";

const errorHandler = (error: unknown, req: Request, res: Response) => {
  const { status, message } = errorBreakdown(error);
  res.status(status).json({ message });
};

export default errorHandler;
