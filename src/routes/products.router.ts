import { Router } from "express";
import productsController from "@controllers/products.controller";

const router = Router();

router.get("/", productsController.get);
router.get("/:productId", productsController.getOneById);
router.post("/", productsController.createOne);
router.patch("/:productId", productsController.updateOneById);

export default router;
