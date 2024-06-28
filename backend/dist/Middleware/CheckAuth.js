"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonRes_1 = require("../Services/Utilits/JsonRes");
const jsonwebtoken_1 = require("jsonwebtoken");
class Auth {
    constructor() {
        this.checkAuth = (req, res, next) => {
            const { access_token } = req.cookies;
            if (!this.jwt_secret) {
                return res.json({ error: 'not_auth' });
            }
            try {
                const data = (0, jsonwebtoken_1.verify)(access_token, this.jwt_secret);
                req.AuthUser = data;
                next();
            }
            catch (error) {
                res.json('not_auth');
            }
        };
        this.checkAuthorize = (role) => (req, res, next) => {
            var _a;
            const { access_token } = req.cookies;
            if (access_token && ((_a = req.AuthUser) === null || _a === void 0 ? void 0 : _a.role) === role) {
                next();
            }
            else {
                res.json((0, JsonRes_1.errorJson)('Forbidden', null));
            }
        };
        this.jwt_secret = process.env.JWT_TOKEN;
    }
}
exports.default = new Auth();
