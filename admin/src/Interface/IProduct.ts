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
