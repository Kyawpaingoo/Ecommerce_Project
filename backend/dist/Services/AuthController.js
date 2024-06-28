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
exports.checkAuth = exports.logout = exports.login = exports.register = void 0;
const validator_js_1 = __importDefault(require("indicative/validator.js"));
const JsonRes_js_1 = require("./Utilits/JsonRes.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_js_1 = __importDefault(require("../Model/UserModel.js"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const findUser = yield UserModel_js_1.default.findOne({ email });
    if (findUser) {
        return res.json((0, JsonRes_js_1.errorJson)("Email Exist", null));
    }
    else {
        validator_js_1.default.validateAll(req.body, {
            name: "required",
            email: "required|email",
            password: "required|min:4"
        }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashPassword = bcryptjs_1.default.hashSync(password, salt);
            const createUser = yield UserModel_js_1.default.create({
                name,
                email,
                password: hashPassword,
                role: 'user'
            });
            return res.json((0, JsonRes_js_1.successJson)('success', {
                id: createUser._id,
                name: createUser.name
            }));
        })).catch((e) => {
            return res.json((0, JsonRes_js_1.errorJson)('validate_error', e));
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const findUser = yield UserModel_js_1.default.findOne({ email });
    if (!findUser) {
        return res.json((0, JsonRes_js_1.errorJson)('email not found', null));
    }
    else {
        const verifyPasssword = bcryptjs_1.default.compareSync(password, findUser.password);
        if (!verifyPasssword) {
            return res.json((0, JsonRes_js_1.errorJson)('wrong password', null));
        }
        const access_token = generateAccessToken({ name: findUser.name, _id: findUser.id, role: findUser.role });
        res.cookie('access_token', access_token, { httpOnly: true });
        return res.json((0, JsonRes_js_1.successJson)('success', { id: findUser._id, name: findUser.name, role: findUser.role }));
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json('success');
});
exports.logout = logout;
const generateAccessToken = (payload) => {
    const jwt_secrect = process.env.JWT_TOKEN;
    const access_token = jsonwebtoken_1.default.sign(payload, jwt_secrect);
    return access_token;
};
const checkAuth = (req, res) => {
    const { access_token } = req.cookies;
    //console.log(access_token)
    const jwt_secrect = process.env.JWT_TOKEN;
    if (!jwt_secrect) {
        return res.json('not_auth');
    }
    jsonwebtoken_1.default.verify(access_token, jwt_secrect, (error, data) => {
        if (error) {
            return res.json('not_auth');
        }
        return res.json(data);
    });
};
exports.checkAuth = checkAuth;
