import { Response } from "express";

type IApiResponse<T> = {
    statusCode: number;
    operation: string;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        documentCount: number;
    };
    data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData: IApiResponse<T> = {
        statusCode: data.statusCode,
        operation: data.operation,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};

export default sendResponse;
