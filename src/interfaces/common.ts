import { IGenericErrorMessage } from "./error";

export type IGenericErrorResonse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};
