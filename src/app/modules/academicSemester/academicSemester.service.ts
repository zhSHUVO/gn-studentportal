import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {
    academicSemesterSearchableField,
    academicSemesterTitleCodeMapper,
} from "./academicSemester.constant";
import {
    IAcademicSemester,
    IAcademicSemesterFilterSearch,
} from "./academicSemester.interface";
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
    filterSearch: IAcademicSemesterFilterSearch,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { search, ...filter } = filterSearch;

    const queryConditions = [];

    if (search) {
        queryConditions.push({
            $or: academicSemesterSearchableField.map(field => ({
                [field]: {
                    $regex: search,
                    $options: "i",
                },
            })),
        });
    }

    if (Object.keys(filter).length) {
        queryConditions.push({
            $and: Object.entries(filter).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const { page, limit, skipPages, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortFormats: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortFormats[sortBy] = sortOrder;
    }

    const queryParameters =
        queryConditions.length > 0 ? { $and: queryConditions } : {};

    const selectedPage = await AcademicSemester.find(queryParameters)
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

const getSingleSemester = async (
    id: string
): Promise<IAcademicSemester | null> => {
    const semester = await AcademicSemester.findById(id);
    return semester;
};

const updateSemester = async (
    id: string,
    payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
    if (
        payload.title &&
        payload.code &&
        academicSemesterTitleCodeMapper[payload.title] !== payload.code
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
    }

    const updatedSemester = await AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return updatedSemester;
};

export const AcademicSemesterService = {
    createSemester,
    getAllSemester,
    getSingleSemester,
    updateSemester,
};
