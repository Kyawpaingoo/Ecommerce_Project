export interface IApiListResponse<T>{
    docs: T[] | null;
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface IApiListHookResult<T>{
    resultList: T[] | null;
    page: number;
    count: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null;
}