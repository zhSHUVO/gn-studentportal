import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../general/catchAsync";
import { paginationProperties } from "../../../general/pagination";
import selectProperties from "../../../general/selectProperties";
import sendResponse from "../../../general/sendResponse";
import { academicDepartmentFilterableFields } from "./academicDepartment.constants";
import { IAcademicDepartment } from "./academicDepartment.interfaces";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const newDepartment = await AcademicDepartmentService.createDepartment(
        academicDepartmentData
    );

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "Academic Department created successfully",
        data: newDepartment,
    });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
    const filters = selectProperties(
        req.query,
        academicDepartmentFilterableFields
    );
    const paginationOptions = selectProperties(req.query, paginationProperties);

    const paginationOutput = await AcademicDepartmentService.getAllDepartments(
        filters,
        paginationOptions
    );

    sendResponse<IAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "Academic departments fetched successfully",
        meta: paginationOutput.meta,
        data: paginationOutput.data,
    });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const department = await AcademicDepartmentService.getSingleDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "All Department fetched successfully",
        data: department,
    });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedDepartment = await AcademicDepartmentService.updateDepartment(
        id,
        req.body
    );

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "Academic Department updated successfully",
        data: updatedDepartment,
    });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedDepartment = await AcademicDepartmentService.deleteDepartment(
        id
    );

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        operation: "Successful",
        message: "Academic Department deleted successfully",
        data: deletedDepartment,
    });
});

export const AcademicDepartmentController = {
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
    createDepartment,
};
