import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../general/catchAsync";
import selectProperties from "../../../general/selectProperties";
import sendResponse from "../../../general/sendResponse";
import { paginationProperties } from "./academicSemester.constant";
import {
    IAcademicSemester,
    academicSemesterFilterableField,
} from "./academicSemester.interface";
import { AcademicSemesterService } from "./academicSemester.service";

const createSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...academicSemesterData } = req.body;
        const newSemester = await AcademicSemesterService.createSemester(
            academicSemesterData
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            operation: "Successful",
            message: "Semester created successfully",
            data: newSemester,
        });
        next();
    }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
    const filterSearch = selectProperties(
        req.query,
        academicSemesterFilterableField
    );
    const paginationOptions = selectProperties(req.query, paginationProperties);

    const paginationOutput = await AcademicSemesterService.getAllSemester(
        filterSearch,
        paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "All semesters fetching successful",
        meta: paginationOutput.meta,
        data: paginationOutput.data,
    });
});

const getSingleSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const semester = await AcademicSemesterService.getSingleSemester(id);

        sendResponse<IAcademicSemester>(res, {
            statusCode: httpStatus.OK,
            operation: "Successful",
            message: "Semester fetching successful",
            data: semester,
        });
        next();
    }
);

const updateSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const updatedData = req.body;

        const updatedSemester = await AcademicSemesterService.updateSemester(
            id,
            updatedData
        );

        sendResponse<IAcademicSemester>(res, {
            statusCode: httpStatus.OK,
            operation: "Successful",
            message: "Semester update successful",
            data: updatedSemester,
        });
        next();
    }
);

export const AcademicSemesterController = {
    createSemester,
    getAllSemester,
    getSingleSemester,
    updateSemester,
};
