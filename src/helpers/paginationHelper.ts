import { SortOrder } from "mongoose";

type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};

type IOptionsResult = {
    page: number;
    limit: number;
    skipPages: number;
    sortBy: string;
    sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skipPages = (page - 1) * limit;

    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";

    return {
        page,
        limit,
        skipPages,
        sortBy,
        sortOrder,
    };
};

export const paginationHelpers = {
    calculatePagination,
};
