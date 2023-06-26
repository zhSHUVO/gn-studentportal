import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../general/catchAsync";
import { paginationProperties } from "../../../general/pagination";
import selectProperties from "../../../general/selectProperties";
import sendResponse from "../../../general/sendResponse";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";
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

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
    const filterSearch = selectProperties(
        req.query,
        academicFacultyFilterableFields
    );
    const paginationOptions = selectProperties(req.query, paginationProperties);

    const paginationOutput = await AcademicFacultyService.getAllFaculty(
        filterSearch,
        paginationOptions
    );
    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "All faculty fetching successful",
        meta: paginationOutput.meta,
        data: paginationOutput.data,
    });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const faculty = await AcademicFacultyService.getSingleFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "Academic Faculty fetched successfully",
        data: faculty,
    });
});

export const AcademicFacultyController = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
};
