import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface IOrder extends IBase {
    code: string;
    user: string;
    shipping_address: string;
    status: string;   
    deliPrice: Number;
    TotalPrice: Number;
}

class OrderModel extends BaseModel<IOrder>{
    constructor(){
        const orderSchemaDefinition: SchemaDefinition<IOrder> = {
            code: {
                type: String, required: true
            },
            user: {
                type: String, required: true
            },
            shipping_address: {
                type:String, required: true 
            },
            status: {
                type: String, required: true 
            },
            deliPrice: {
                type: Number, required: true
            },
            TotalPrice: {
                type: Number, required: true
            }
        };
        super(orderSchemaDefinition);
        this.schema.index({code: 'text'});
    }
    getModel(): Model<IOrder> {
        return super.getModel('orders')
    }
}

export default new OrderModel().getModel();