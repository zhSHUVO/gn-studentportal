import { RequestHandler } from "express";
import { UserSevice } from "./user.service";

const createdUser: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req.body;
        const newUser = await UserSevice.createUser(user);
        res.status(200).json({
            operation: "Successful",
            message: "User created successfully",
            data: newUser,
        });
        return next();
    } catch (error) {
        next(error);
    }
};

export const UserController = {
    createdUser,
};
