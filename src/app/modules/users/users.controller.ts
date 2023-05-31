import { Request, Response } from "express";
import usersService from "./users.service";

const createdUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const newUser = await usersService.createUser(user);
        res.status(200).json({
            operation: "Successful",
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        console.log("Error creating user:", (error as Error).message);
        res.status(400).json({
            operation: "Failed",
            message: "Failed to create user",
        });
    }
};

export default { createdUser };
