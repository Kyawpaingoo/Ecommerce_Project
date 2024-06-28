"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class UserModel extends BaseModel_1.BaseModel {
    constructor() {
        const userSchemaDefinition = {
            name: {
                type: String, required: true
            },
            email: {
                type: String, required: true
            },
            password: {
                type: String, required: true
            },
            role: {
                type: String, required: true
            },
            gender: {
                type: String, required: true
            },
            image: {
                type: String, required: true
            }
        };
        super(userSchemaDefinition);
        this.schema.index({ name: 'text' });
    }
    getModel() {
        return super.getModel('users');
    }
}
exports.default = new UserModel().getModel();
