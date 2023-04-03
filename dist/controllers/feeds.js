"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feed_1 = require("../models/feed");
const moment_1 = __importDefault(require("moment"));
function add(req, res, next) {
    if (req.body.fecha) {
        var date = (0, moment_1.default)(req.body.fecha);
        if (!date.isValid())
            return next({ code: 400, message: "Error en la fecha, debe tener el formato YYYY-MM-DD" });
    }
    let feed = new feed_1.Feed({ titulo: req.body.titulo, cuerpo: req.body.cuerpo, fecha: req.body.fecha, type: 'custom', enlace: req.body.enlace });
    feed.save().then(feed => {
        next({ code: 200, message: "Feed insertado corectamente" });
    })
        .catch(next);
}
function get(req, res, next) {
    let params = {};
    if (req.params.type == 'mundo' || req.params.type == 'pais' || req.params.type == 'custom')
        params = { type: req.params.type };
    feed_1.Feed.find(params).then(results => {
        next({ code: 200, message: results });
    });
}
module.exports = {
    get,
    add
};
