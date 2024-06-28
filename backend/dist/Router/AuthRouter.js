"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthService_1 = require("../Services/AuthServices/AuthService");
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const Repository_1 = require("../Repository/Repository");
const AuthRouter = express_1.default.Router();
const repository = new Repository_1.Repository(UserModel_1.default);
const authServiceInstance = new AuthService_1.AuthService(repository);
AuthRouter.post('/register', authServiceInstance.register);
// AuthRouter.post('/login', login);
// AuthRouter.post('/logout', logout);
// AuthRouter.get('/checkAuth', checkAuth);
exports.default = AuthRouter;
