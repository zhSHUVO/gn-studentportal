import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import apiRoutes from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        operation: "Failed",
        message: "Invalid route",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "Route not found",
            },
        ],
    });
});

export default app;
