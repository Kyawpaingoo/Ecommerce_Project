"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class BrandModel extends BaseModel_1.BaseModel {
    constructor() {
        const brandSchemaDefinition = {
            slug: {
                type: String, required: true
            },
            brand: {
                type: String, required: true
            }
        };
        super(brandSchemaDefinition);
        this.schema.index({ slug: 'text' });
    }
    getModel() {
        return super.getModel('brands');
    }
}
exports.default = new BrandModel().getModel();
