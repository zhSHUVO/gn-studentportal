import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../error/ApiError";
import handleValidationError from "../../error/handleValidationError";
import { errorLogger } from "../../general/logger";
import handleZodError from "../../handleZodError";
import { IGenericErrorMessage } from "../../interfaces/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    config.env === "develpment"
        ? console.log("globalErrorHandler", error)
        : errorLogger.error("globalErrorHandler", error);

    let statusCode = 500;
    let message = "Internal Server Error";
    let errorMessages: IGenericErrorMessage[] = [];

    if (error?.name === "ValidationError") {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: "",
                      message: error?.message,
                  },
              ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: "",
                      message: error?.message,
                  },
              ]
            : [];
    }

    res.status(statusCode).json({
        operation: "Failed",
        message,
        errorMessages,
        stack: config.env !== "production" ? error?.stack : undefined,
    });

    next();
};

export default globalErrorHandler;
