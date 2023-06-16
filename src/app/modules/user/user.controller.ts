import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../general/catchAsync";
import sendResponse from "../../../general/sendResponse";
import { UserSevice } from "./user.service";

const createdUser: RequestHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { user } = req.body;
        const newUser = await UserSevice.createUser(user);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            operation: "Successful",
            message: "User created successfully",
            data: newUser,
        });
        next();
    }
);

export const UserController = {
    createdUser,
};
