"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class ProductModel extends BaseModel_1.BaseModel {
    constructor() {
        const productSchemaDefinition = {
            name: {
                type: String, required: true
            },
            image: {
                type: String, required: true
            },
            price: {
                type: Number, required: true
            },
            color: [
                {
                    _id: { String, required: true },
                    color: { String, required: true }
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
        this.schema.index({ name: 'text' });
    }
    getModel() {
        return super.getModel('products');
    }
}
exports.default = new ProductModel().getModel();
