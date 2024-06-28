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
exports.PaginateHelper = void 0;
class PaginateHelper {
    constructor(model) {
        this.model = model;
    }
    paginateResult() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, sortDir = '_id', sortVal = -1, conditions = []) {
            try {
                const query = conditions.length > 0 ? { $and: conditions } : {};
                const result = yield this.model.paginate(query, {
                    page: page,
                    limit: limit,
                    sort: { [sortDir]: sortVal }
                });
                return result;
            }
            catch (error) {
                console.log('Error pagination data', error);
                throw error;
            }
        });
    }
}
exports.PaginateHelper = PaginateHelper;
