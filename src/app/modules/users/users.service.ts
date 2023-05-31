import config from "../../../config";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import { generateUserId } from "./users.utils";

const createUser = async (user: IUser): Promise<IUser | null> => {
    // setting user id
    const id = await generateUserId();
    user.id = id;

    // setting user pass
    if (!user.password) {
        user.password = config.default_user_pass as string;
    }

    const createdUser = User.create(user);
    if (!createdUser) {
        throw new Error("Failed to create a user!");
    }

    return createdUser;
};

export default { createUser };
