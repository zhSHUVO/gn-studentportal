import { IGenericErrorMessage } from "./error";

export type IGenericResonse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};
