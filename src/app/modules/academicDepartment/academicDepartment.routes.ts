import express from "express";
import validateReq from "../../middlewares/validateReq";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { AcademicDepartmentValidation } from "./academicDepartment.validations";

const router = express.Router();

router.post(
    "/create-department",
    validateReq(AcademicDepartmentValidation.createAcademicDepartmentZodSchema),
    AcademicDepartmentController.createDepartment
);

router.get("/:id", AcademicDepartmentController.getSingleDepartment);

router.patch(
    "/:id",
    validateReq(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema),
    AcademicDepartmentController.updateDepartment
);

router.delete("/:id", AcademicDepartmentController.deleteDepartment);

router.get("/", AcademicDepartmentController.getAllDepartments);

export const academicDepartmentRoutes = router;
