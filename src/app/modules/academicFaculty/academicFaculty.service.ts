import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createFaculty = async (
    payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
    const newFaculty = await AcademicFaculty.create(payload);
    return newFaculty;
};

export const AcademicFacultyService = {
    createFaculty,
};
