"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", require("./routes"));
app.use((item, req, res, next) => {
    if (!item.code)
        item.code = item.statusCode;
    try {
        if (!item.code) {
            res.sendStatus(500);
            console.log(item);
        }
        else {
            if (item.message) {
                res.status(item.code).send(item.message);
            }
            else {
                res.sendStatus(item.code);
            }
        }
    }
    catch (e) {
        res.sendStatus(500);
        console.log(item);
    }
});
exports.default = app;
