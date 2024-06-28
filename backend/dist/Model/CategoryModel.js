"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class CategoryModel extends BaseModel_1.BaseModel {
    constructor() {
        const categorySchemaDefinition = {
            slug: {
                type: String, required: true
            },
            category: {
                type: String, required: true
            }
        };
        super(categorySchemaDefinition);
        this.schema.index({ slug: 'text' });
    }
    getModel() {
        return super.getModel('categories');
    }
}
exports.default = new CategoryModel().getModel();
