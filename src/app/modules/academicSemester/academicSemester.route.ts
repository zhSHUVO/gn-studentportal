import express from "express";
import validateReq from "../../middlewares/validateReq";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.get("/:id", AcademicSemesterController.getSingleSemester);

router.patch(
    "/:id",
    validateReq(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
    AcademicSemesterController.updateSemester
);

router.delete("/:id", AcademicSemesterController.deleteSemester);

router.get("/", AcademicSemesterController.getAllSemester);

router.post(
    "/create-semester",
    validateReq(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
