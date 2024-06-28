"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorJson = exports.successJson = void 0;
const successJson = (message, data) => {
    return {
        success: true,
        message: message,
        data: data
    };
};
exports.successJson = successJson;
const errorJson = (message, data) => {
    return {
        success: false,
        message: message,
        data: data
    };
};
exports.errorJson = errorJson;
