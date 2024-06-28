import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

interface IColorProduct {
    _id: string;
    color: string;
}
export interface IProduct extends IBase{
    name: string;
    image: string;
    price: number;
    color: IColorProduct[];
    like_count: number;
    stock: number;
    gender: string;
    brand: string;
    category: string;
}

class ProductModel extends BaseModel<IProduct> {
    constructor(){
        const productSchemaDefinition: SchemaDefinition<IProduct> = {
            name: {
                type: String, required: true
            },
            image: {
                type: String, required:true
            },
            price: {
                type: Number, required: true
            },
            color:[
                {
                    _id: {String, required: true},
                    color: {String, required: true}
                }
            ],
            like_count: {
                type: Number, required: true
            },
            stock: {
                type: Number, required: true
            },
            gender: {
                type: String, required: true
            },
            brand: {
                type: String, required: true
            },
            category: {
                type: String, required: true
            }
        };
        super(productSchemaDefinition);
        this.schema.index({name: 'text'})
    }
    getModel(): Model<IProduct> {
        return super.getModel('products')
    }
}

export default new ProductModel().getModel();