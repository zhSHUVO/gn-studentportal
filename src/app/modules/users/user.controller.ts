import { RequestHandler } from "express";
import { z } from "zod";
import { UserSevice } from "./user.service";

const createdUser: RequestHandler = async (req, res, next) => {
    try {
        // req validation
        const createUserZodSchema = z.object({
            body: z.object({
                role: z.string({
                    required_error: "role is required",
                }),
                password: z.string().optional(),
            }),
        });

        await createUserZodSchema.parseAsync(req);

        const { user } = req.body;
        const newUser = await UserSevice.createUser(user);
        res.status(200).json({
            operation: "Successful",
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

export const UserController = {
    createdUser,
};
