import mongoose from "mongoose";
import { IGenericErrorResonse } from "../interfaces/common";
import { IGenericErrorMessage } from "../interfaces/error";

const handleValidationError = (
    error: mongoose.Error.ValidationError
): IGenericErrorResonse => {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
        (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: el?.path,
                message: el?.message,
            };
        }
    );
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessages: errors,
    };
};

export default handleValidationError;
