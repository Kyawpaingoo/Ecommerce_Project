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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastestReview = exports.all = exports.store = void 0;
const PaginateHelper_js_1 = require("../Helper/PaginateHelper.js");
const GetSpecificData_js_1 = require("../Helper/GetSpecificData.js");
const ReviewModel_js_1 = __importDefault(require("../Model/ReviewModel.js"));
const validator_js_1 = __importDefault(require("indicative/validator.js"));
const JsonRes_js_1 = require("./Utilits/JsonRes.js");
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, review, rating } = req.body;
    try {
        validator_js_1.default.validateAll(req.body, {
            name: 'required',
            email: 'required|email',
            review: 'required',
            rating: 'required'
        }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield ReviewModel_js_1.default.create({
                name,
                email,
                review,
                rating
            });
            return res.json((0, JsonRes_js_1.successJson)('success', {}));
        })).catch((e) => {
            return res.json((0, JsonRes_js_1.errorJson)('validate_error', e));
        });
        //res.json(data);
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.store = store;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, name } = req.query;
    const limit = 5;
    const sortField = "_id";
    const sortOrder = -1;
    const queryBuilder = [];
    if (name) {
        queryBuilder.push({ $name: { $search: name } });
    }
    const result = yield (0, PaginateHelper_js_1.paginateResult)(ReviewModel_js_1.default, page, limit, sortField, sortOrder, queryBuilder);
    res.json(result);
});
exports.all = all;
const getLastestReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, GetSpecificData_js_1.getSpecificData)(ReviewModel_js_1.default, 4, '_id', -1);
    res.json(result);
});
exports.getLastestReview = getLastestReview;
