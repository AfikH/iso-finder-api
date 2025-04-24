import { Router } from "express";
import productCategoriesController from "@controllers/productCategories.controller";

const router = Router();

router.get("/", productCategoriesController.get);
router.get("/:productCategoryId", productCategoriesController.getOneById);
router.post("/", productCategoriesController.createOne);
router.patch("/:productCategoryId", productCategoriesController.updateOneById);

export default router;
