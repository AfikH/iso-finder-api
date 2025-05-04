import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";

import errorHandler from "@middlewares/errorHandler.middleware";
import requestLogger from "@middlewares/requestLogger.middleware";
import certificationsRouter from "@routes/certifications.router";
import companiesRouter from "@routes/companies.router";
import companyCategoriesRouter from "@routes/companyCategories.router";
import productCategoriesRouter from "@routes/productCategories.router";
import productsRouter from "@routes/products.router";

const app = express();

app.use(express.json());

// request logging middleware
app.use(requestLogger);

// protection layer
app.use(helmet());
app.use(cors());
app.use(hpp());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hay");
});

app.use("/certifications", certificationsRouter);
app.use("/companies", companiesRouter);
app.use("/company-categories", companyCategoriesRouter);
app.use("/products", productsRouter);
app.use("/product-categories", productCategoriesRouter);

// error handling middleware
app.use(errorHandler);

export { app };
