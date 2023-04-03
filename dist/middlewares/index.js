"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../services/token"));
function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return next({ code: 403, message: "Permisos insuficientes" });
    }
    token_1.default.decodeJWT(req.headers.authorization).then(response => {
        next();
    })
        .catch(next);
}
exports.default = {
    isAuth
};
