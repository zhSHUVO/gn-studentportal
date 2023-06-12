import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../error/ApiError";
import {
    academicSemesterCodes,
    academicSemesterTitles,
    acdemicSemesterMonths,
} from "./academicSemester.constant";
import {
    AcademicSemesterModel,
    IAcademicSemester,
} from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitles,
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCodes,
        },
        startMonth: {
            type: String,
            required: true,
            enum: acdemicSemesterMonths,
        },
        endMonth: {
            type: String,
            required: true,
            enum: acdemicSemesterMonths,
        },
    },
    {
        timestamps: true,
    }
);

academicSemesterSchema.pre("save", async function (next) {
    const isExist = await AcademicSemester.findOne({
        title: this.title,
        year: this.year,
    });
    if (isExist) {
        throw new ApiError(
            httpStatus.CONFLICT,
            "Academic Semester is already existed"
        );
    }
    next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
    "AcademicSemester",
    academicSemesterSchema
);
