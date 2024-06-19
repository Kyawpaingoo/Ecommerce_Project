import { IProduct } from "./IProduct";

export interface IOrder{
    _id: string;
    code:string;
    user:string;
    subTotalPrice: number;
    shipping_address:string;
    status: string;
    createdAt: string;
    upadetedAt: string;
}

export interface IOrderDetail {
    _id: string;
    product: IProduct;
    order_id: string;
    qty: number;
    price: number;
}

export interface IOrderApiResponse{
    docs: IOrder[] | null;
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

export interface OrderHookResult {
    orderList: IOrder[] | null;
    page: number;
    count: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null;
}