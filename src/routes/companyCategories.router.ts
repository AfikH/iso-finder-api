import { Router } from "express";
import companyCategoriesController from "@controllers/companyCategories.controller";

const router = Router();

router.get("/", companyCategoriesController.get);
router.get("/:companyCategoryId", companyCategoriesController.getOneById);
router.post("/", companyCategoriesController.createOne);
router.patch("/:companyCategoryId", companyCategoriesController.updateOneById);

export default router;
