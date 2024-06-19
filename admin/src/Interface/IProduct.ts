export interface IColor {
    _id: string;
    color: string;
}

export interface IProduct {
    _id?: string;
    name: string;
    image: string;
    price: number;
    color: IColor[];
    like_count?: number;
    stock: number;
    gender: string;
    brand: string;
    category: string;
    _v?: number;
}

export interface IApiResponse {
    docs: IProduct[] | null;
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

export interface ProductHookResult {
    productList: IProduct[] | null;
    page: number;
    count: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null;
}