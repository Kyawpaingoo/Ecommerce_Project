"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class OrderModel extends BaseModel_1.BaseModel {
    constructor() {
        const orderSchemaDefinition = {
            code: {
                type: String, required: true
            },
            user: {
                type: String, required: true
            },
            shipping_address: {
                type: String, required: true
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
        this.schema.index({ code: 'text' });
    }
    getModel() {
        return super.getModel('orders');
    }
}
exports.default = new OrderModel().getModel();
