import { Router } from "express";
import certificationsController from "@controllers/certifications.controller";

const router = Router();

router.get("/", certificationsController.get);
router.get("/:certificationId", certificationsController.getOneById);
router.post("/", certificationsController.createOne);
router.patch("/:certificationId", certificationsController.updateOneById);

export default router;
