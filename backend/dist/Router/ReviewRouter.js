"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CheckAuth_js_1 = require("../Middleware/CheckAuth.js");
const ReviewController_js_1 = require("../Services/ReviewController.js");
const ReviewRouter = express_1.default.Router();
ReviewRouter.use(CheckAuth_js_1.checkAuth);
ReviewRouter.post('/store', (0, CheckAuth_js_1.checkAuthorize)('user'), ReviewController_js_1.store);
ReviewRouter.get('/all', (0, CheckAuth_js_1.checkAuthorize)('admin'), ReviewController_js_1.all);
ReviewRouter.get('/getlatest', ReviewController_js_1.getLastestReview);
exports.default = ReviewRouter;
