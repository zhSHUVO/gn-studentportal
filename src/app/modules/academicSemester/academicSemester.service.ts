import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createSemester = async (
    payload: IAcademicSemester
): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
    }
    const result = await AcademicSemester.create(payload);
    return result;
};

const getAllSemester = async (
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    // const { page = 1, limit = 10 } = paginationOptions;
    // const skipPages = (page - 1) * limit;
    const { page, limit, skipPages, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortFormats: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortFormats[sortBy] = sortOrder;
    }

    const selectedPage = await AcademicSemester.find()
        .sort(sortFormats)
        .skip(skipPages)
        .limit(limit);

    const documentCount = await AcademicSemester.countDocuments();

    return {
        data: selectedPage,
        meta: {
            page,
            limit,
            documentCount,
        },
    };
};

export const AcademicSemesterService = {
    createSemester,
    getAllSemester,
};
