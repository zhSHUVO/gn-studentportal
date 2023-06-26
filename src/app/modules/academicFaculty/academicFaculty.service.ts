import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicFacultySearchableFields } from "./academicFaculty.constant";
import {
    IAcademicFaculty,
    IAcademicFacultyFilterSearch,
} from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createFaculty = async (
    payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
    const newFaculty = await AcademicFaculty.create(payload);
    return newFaculty;
};

const getAllFaculty = async (
    filterSearch: IAcademicFacultyFilterSearch,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
    const { search, ...filter } = filterSearch;

    const queryConditions = [];

    if (search) {
        queryConditions.push({
            $or: academicFacultySearchableFields.map(field => ({
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

    const selectedPage = await AcademicFaculty.find(queryParameters)
        .sort(sortFormats)
        .skip(skipPages)
        .limit(limit);

    const documentCount = await AcademicFaculty.countDocuments();

    return {
        data: selectedPage,
        meta: {
            page,
            limit,
            documentCount,
        },
    };
};

const getSingleFaculty = async (
    id: string
): Promise<IAcademicFaculty | null> => {
    const faculty = await AcademicFaculty.findById(id);
    return faculty;
};

const updateFaculty = async (
    id: string,
    payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
    const updatedFaculty = await AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        }
    );
    return updatedFaculty;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const deletedFaculty = await AcademicFaculty.findByIdAndDelete(id);
    return deletedFaculty;
};

export const AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
