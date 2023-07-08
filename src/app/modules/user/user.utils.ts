import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastUser?.id;
};

export const generateStundentId = async (
    academincSemester: IAcademicSemester
): Promise<string> => {
    const lastUserId = await findLastStudentId();
    const currentUserId = lastUserId ? parseInt(lastUserId) : 0;
    let incrementedUserId = (currentUserId + 1).toString().padStart(5, "0");

    incrementedUserId = `${academincSemester.year.substring(2)}${
        academincSemester.code
    }${incrementedUserId}`;

    return incrementedUserId;
};
