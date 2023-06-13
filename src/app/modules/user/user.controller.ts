import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../general/catchAsync";
import sendResponse from "../../../general/sendResponse";
import { UserSevice } from "./user.service";

const createdUser: RequestHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { user } = req.body;
        const newUser = await UserSevice.createUser(user);
        next();
        // res.status(200).json({
        //     operation: "Successful",
        //     message: "User created successfully",
        //     data: newUser,
        // });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            operation: "Successful",
            message: "User created successfully",
            data: newUser,
        });
    }
);

export const UserController = {
    createdUser,
};
