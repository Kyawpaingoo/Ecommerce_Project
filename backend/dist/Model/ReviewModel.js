"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class ReviewModel extends BaseModel_1.BaseModel {
    constructor() {
        const reviewSchemaDefinition = {
            name: {
                type: String, required: true,
            },
            email: {
                type: String, required: true,
            },
            review: {
                type: String, required: true,
            },
            rating: {
                type: Number, required: true
            }
        };
        super(reviewSchemaDefinition);
        this.schema.index({ name: 'text' });
    }
    getModel() {
        return super.getModel('reviews');
    }
}
exports.default = new ReviewModel().getModel();
