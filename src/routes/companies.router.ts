import { Router } from "express";
import companiesController from "@controllers/companies.controller";

const router = Router();

router.get("/", companiesController.get);
router.get("/:companyId", companiesController.getOneById);
router.post("/", companiesController.createOne);
router.patch("/:companyId", companiesController.updateOneById);

export default router;
