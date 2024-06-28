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
exports.AuthService = void 0;
const JsonRes_1 = require("../Utilits/JsonRes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const indicative_1 = require("indicative");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    constructor(repository) {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const users = yield this.repository.GetAll();
            const findUser = users.find((user) => user.email === email);
            if (findUser) {
                const errorResponse = (0, JsonRes_1.errorJson)("Email Exist", null);
                return res.status(400).json(errorResponse);
            }
            indicative_1.validator.validateAll(req.body, {
                name: "required",
                email: "required|email",
                password: "required|min:4"
            }).then(() => __awaiter(this, void 0, void 0, function* () {
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashPassword = bcryptjs_1.default.hashSync(password, salt);
                const createUser = yield this.repository.InsertReturnAsync(Object.assign({ password: hashPassword }, req.body));
                return res.json({ success: true, message: "success", data: { _id: createUser._id, name: createUser.name } });
            }));
        });
        this.generateAccessToken = (payload) => __awaiter(this, void 0, void 0, function* () {
            const jwt_secrect = process.env.JWT_TOKEN;
            const access_token = jsonwebtoken_1.default.sign(payload, jwt_secrect);
            return access_token;
        });
        this.repository = repository;
        this.jwt_secret = process.env.JWT_TOKEN;
    }
}
exports.AuthService = AuthService;
