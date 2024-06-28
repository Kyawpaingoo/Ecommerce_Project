"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const mongoose_1 = require("mongoose");
class Repository {
    constructor(model) {
        this.model = (mongoose_1.Model);
        this.model = model;
    }
    GetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findById(id).orFail().exec();
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find().orFail().exec();
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    InsertReturnAsync(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.create(data);
                return result != null ? result : null;
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    UpdateAsync(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findByIdAndUpdate({ _id: id }, data, { new: true });
                return result != null ? result : null;
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    DeleteAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findByIdAndDelete({ _id: id });
                return result != null;
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
}
exports.Repository = Repository;
