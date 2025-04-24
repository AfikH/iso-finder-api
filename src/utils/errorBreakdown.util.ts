import logger from "./logger.util";

const errorBreakdown = (error: unknown): { status: number; message: string } => {
  switch (error) {
    default:
      logger.error({ message: "Unhandled Error.", stack: error });
      return { status: 500, message: "Something went wrong." };
  }
};

export default errorBreakdown;
