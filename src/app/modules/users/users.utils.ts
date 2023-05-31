import { User } from "./users.model";

const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastUser?.id;
};

export const generateUserId = async (): Promise<string> => {
    const lastUserId = await findLastUserId();
    const currentUserId = lastUserId ? parseInt(lastUserId) : 0;
    const incrementedUserId = (currentUserId + 1).toString().padStart(5, "0");

    return incrementedUserId;
};
