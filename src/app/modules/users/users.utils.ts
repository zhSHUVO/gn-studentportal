import { User } from "./users.model";

const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastUser?.id;
};

export const generateUserId = async () => {
    const createId = (await findLastUserId()) || (0).toString();
    return createId;
};
