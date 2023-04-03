"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FeedSchema = new mongoose_1.default.Schema({
    titulo: { type: String },
    cuerpo: { type: String },
    type: { type: String, enum: ['mundo', 'pais', 'custom'] },
    enlace: { type: String },
    fecha: { type: Date, default: Date.now() }
});
exports.Feed = mongoose_1.default.model('Feed', FeedSchema);
