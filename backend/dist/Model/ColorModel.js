"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class ColorModel extends BaseModel_1.BaseModel {
    constructor() {
        const colorSchemaDefintion = {
            slug: {
                type: String, required: true
            },
            color: {
                type: String, required: true
            }
        };
        super(colorSchemaDefintion);
        this.schema.index({ slug: 'text' });
    }
    getModel() {
        return super.getModel('colors');
    }
}
exports.default = new ColorModel().getModel();
