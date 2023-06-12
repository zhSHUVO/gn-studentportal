import express from "express";

import validateReq from "../../middlewares/validateReq";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/create-user",
    validateReq(UserValidation.createUserZodSchema),
    UserController.createdUser
);

export const UserRoutes = router;
