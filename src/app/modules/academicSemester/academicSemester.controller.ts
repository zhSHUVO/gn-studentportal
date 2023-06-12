import { RequestHandler } from "express";
import { AcademicSemesterService } from "./academicSemester.service";

const createSemester: RequestHandler = async (req, res, next) => {
    try {
        const { ...academicSemesterData } = req.body;
        const newUser = await AcademicSemesterService.createSemester(
            academicSemesterData
        );
        res.status(200).json({
            operation: "Successful",
            message: "Semester created successfully",
            data: newUser,
        });
        return next();
    } catch (error) {
        next(error);
    }
};

export const AcademicSemesterController = {
    createSemester,
};
