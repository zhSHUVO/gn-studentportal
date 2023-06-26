import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../general/catchAsync";
import sendResponse from "../../../general/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyService } from "./academicFaculty.service";

const createFaculty = catchAsync(async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const newFaculty = await AcademicFacultyService.createFaculty(
        academicFacultyData
    );
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "Semester created successfully",
        data: newFaculty,
    });
});

export const AcademicFacultyController = {
    createFaculty,
};
