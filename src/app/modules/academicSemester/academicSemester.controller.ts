import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../general/catchAsync";
import sendResponse from "../../../general/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";

const createSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...academicSemesterData } = req.body;
        const newSemester = await AcademicSemesterService.createSemester(
            academicSemesterData
        );
        next();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            operation: "Successful",
            message: "Semester created successfully",
            data: newSemester,
        });
    }
);

export const AcademicSemesterController = {
    createSemester,
};
