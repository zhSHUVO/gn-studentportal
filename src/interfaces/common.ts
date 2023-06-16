import { IGenericErrorMessage } from "./error";

export type IGenericErrorResonse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
    data: T;
    meta: {
        page: number;
        limit: number;
        documentCount: number;
    };
};
