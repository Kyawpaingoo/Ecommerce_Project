"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CheckAuth_1 = require("../Middleware/CheckAuth");
const AdminController_js_1 = require("../Controller/AdminController.js");
const AdminRouter = express_1.default.Router();
AdminRouter.use(CheckAuth_1.checkAuth);
AdminRouter.get('/users', (0, CheckAuth_1.checkAuthorize)('admin'), AdminController_js_1.getUserList);
AdminRouter.post('/create', (0, CheckAuth_1.checkAuthorize)('admin'), AdminController_js_1.createUser);
exports.default = AdminRouter;
