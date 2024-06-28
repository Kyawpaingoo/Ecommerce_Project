"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
const mongoose_1 = require("mongoose");
class OrderDetailModel extends BaseModel_1.BaseModel {
    constructor() {
        const orderDetailSchemaDefinition = {
            product: {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'products', required: true
            },
            order_id: {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'orders', required: true
            },
            qty: {
                type: Number, required: true
            },
            price: {
                type: Number, required: true
            }
        };
        super(orderDetailSchemaDefinition);
        this.schema.index({ product: 'text' });
    }
    getModel() {
        return super.getModel('order_details');
    }
}
exports.default = new OrderDetailModel().getModel();
