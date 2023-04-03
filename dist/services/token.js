"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = require("jwt-simple");
const config_1 = __importDefault(require("../config"));
function encodeJWT(str) {
    return (0, jwt_simple_1.encode)(str, config_1.default.secret_token);
}
function decodeJWT(token) {
    return new Promise((resolve, reject) => {
        try {
            resolve((0, jwt_simple_1.decode)(token.split("Bearer ")[1], config_1.default.secret_token));
        }
        catch (err) {
            reject({ code: 500 });
        }
    });
}
exports.default = {
    encodeJWT,
    decodeJWT
};
