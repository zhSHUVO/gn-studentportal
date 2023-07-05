import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicDepartmentSearchableFields } from "./academicDepartment.constants";
import {
    IAcademicDepartment,
    IAcademicDepartmentFilters,
} from "./academicDepartment.interfaces";
import { AcademicDepartment } from "./academicDepartment.model";

const createDepartment = async (
    payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
    const newDepartment = (await AcademicDepartment.create(payload)).populate(
        "academicFaculty"
    );
    return newDepartment;
};

const getAllDepartments = async (
    filterSearch: IAcademicDepartmentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
    const { search, ...filter } = filterSearch;

    const queryConditions = [];

    if (search) {
        queryConditions.push({
            $or: academicDepartmentSearchableFields.map(field => ({
                [field]: {
                    $regex: search,
                    $paginationOptions: "i",
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

    const { limit, page, skipPages, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortFormats: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortFormats[sortBy] = sortOrder;
    }
    const queryParameters =
        queryConditions.length > 0 ? { $and: queryConditions } : {};

    const selectedPage = await AcademicDepartment.find(queryParameters)
        .populate("academicFaculty")
        .sort(sortFormats)
        .skip(skipPages)
        .limit(limit);

    const documentCount = await AcademicDepartment.countDocuments();

    return {
        meta: {
            page,
            limit,
            documentCount,
        },
        data: selectedPage,
    };
};

const getSingleDepartment = async (
    id: string
): Promise<IAcademicDepartment | null> => {
    const department = await AcademicDepartment.findById(id).populate(
        "academicFaculty"
    );
    return department;
};

const updateDepartment = async (
    id: string,
    payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
    const updatedDepartment = await AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        }
    ).populate("academicFaculty");
    return updatedDepartment;
};

const deleteDepartment = async (
    id: string
): Promise<IAcademicDepartment | null> => {
    const deletedDepartment = await AcademicDepartment.findByIdAndDelete(id);
    return deletedDepartment;
};

export const AcademicDepartmentService = {
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
    createDepartment,
};
