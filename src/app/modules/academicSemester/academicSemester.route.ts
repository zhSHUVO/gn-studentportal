import express from "express";
import validateReq from "../../middlewares/validateReq";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
    "/create-semester",
    validateReq(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
