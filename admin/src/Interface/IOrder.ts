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
