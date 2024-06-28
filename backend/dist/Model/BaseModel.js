"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
class BaseModel {
    constructor(schemaDefinition) {
        this.schema = new mongoose_1.Schema(schemaDefinition, {
            timestamps: true
        });
        this.schema.plugin(mongoose_paginate_v2_1.default);
    }
    getModel(name) {
        if (!this.model) {
            this.model = (0, mongoose_1.model)(name, this.schema);
        }
        return this.model;
    }
}
exports.BaseModel = BaseModel;
