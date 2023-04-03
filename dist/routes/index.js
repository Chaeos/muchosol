"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middlewares"));
const api = (0, express_1.Router)();
const feedsCtrl = require("../controllers/feeds");
api.put("/add", [middlewares_1.default.isAuth], feedsCtrl.add);
api.get("/get/:type", feedsCtrl.get);
module.exports = api;
