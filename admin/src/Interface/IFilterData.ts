export interface IGender {
    _id: string;
    slug: string;
    gender: string;
}

export interface IBrand {
    _id:string;
    slug: string;
    brand: string;
}

export interface ICategory {
    _id:string;
    slug: string;
    category: string;
}

export interface IColor {
    _id:string;
    slug: string;
    color: string;
}

export interface IFilterData {
    gender: IGender[];
    brand: IBrand[];
    category: ICategory[];
    colors: IColor[];
}