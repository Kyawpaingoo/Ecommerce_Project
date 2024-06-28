import { BaseModel, IBase } from "./BaseModel";
import { Model, Schema, SchemaDefinition, Types } from "mongoose";

export interface IOrderDetail extends IBase{
    product: Types.ObjectId;
    order_id: Types.ObjectId;
    qty: number;
    price: number;
}

class OrderDetailModel extends BaseModel<IOrderDetail>{
    constructor(){
        const orderDetailSchemaDefinition: SchemaDefinition<IOrderDetail> = {
            product: {
                type: Schema.Types.ObjectId, ref: 'products', required: true
            },
            order_id: {
                type: Schema.Types.ObjectId, ref: 'orders', required: true
            },
            qty: {
                type: Number, required: true 
            },
            price: {
                type: Number, required: true 
            }
        };
        super(orderDetailSchemaDefinition);
        this.schema.index({product:'text'});
    }
    getModel(): Model<IOrderDetail> {
        return super.getModel('order_details');
    }
}

export default new OrderDetailModel().getModel();