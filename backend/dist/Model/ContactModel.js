"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class ContactModel extends BaseModel_1.BaseModel {
    constructor() {
        const contactSchemaDefinition = {
            name: {
                type: String, required: true
            },
            email: {
                type: String, required: true
            },
            description: {
                type: String, required: true
            }
        };
        super(contactSchemaDefinition);
        this.schema.index({ name: 'text' });
    }
    getModel() {
        return super.getModel('contacts');
    }
}
exports.default = new ContactModel().getModel();
