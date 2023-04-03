"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Web_noticias, _Web_type, _elMundo_instances, _elMundo_url, _elMundo_extraerNoticia, _elPais_instances, _elPais_url, _elPais_extraerNoticia;
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const moment_1 = __importDefault(require("moment"));
const jsdom_1 = __importDefault(require("jsdom"));
const feed_1 = require("../models/feed");
class Web {
    constructor(type) {
        _Web_noticias.set(this, []);
        _Web_type.set(this, "");
        __classPrivateFieldSet(this, _Web_type, type, "f");
    }
    extraer(url) {
        return new Promise((resolve, reject) => {
            puppeteer_1.default.launch().then(browser => {
                browser.newPage().then(page => {
                    page.goto(url).then(result => {
                        if (result) {
                            result.text().then(body => {
                                resolve(body);
                                browser.close();
                            });
                        }
                        else {
                            reject();
                        }
                    });
                });
            });
        });
    }
    addNoticia(titulo, cuerpo, enlace) {
        __classPrivateFieldGet(this, _Web_noticias, "f").push({ titulo: titulo, cuerpo: cuerpo, enlace: enlace });
    }
    guardar() {
        return new Promise((resolve, reject) => {
            let fecha = (0, moment_1.default)().format('YYYY-MM-DD');
            let promises = [];
            feed_1.Feed.deleteMany({ fecha: fecha, type: __classPrivateFieldGet(this, _Web_type, "f") }).then(() => {
                for (let i = 0; i < __classPrivateFieldGet(this, _Web_noticias, "f").length; i++) {
                    let feed = new feed_1.Feed({ titulo: __classPrivateFieldGet(this, _Web_noticias, "f")[i].titulo, cuerpo: __classPrivateFieldGet(this, _Web_noticias, "f")[i].cuerpo, enlace: __classPrivateFieldGet(this, _Web_noticias, "f")[i].enlace, type: __classPrivateFieldGet(this, _Web_type, "f"), fecha: fecha });
                    promises.push(feed.save());
                }
                Promise.all(promises).then(res => {
                    resolve(true);
                });
            });
        });
    }
}
_Web_noticias = new WeakMap(), _Web_type = new WeakMap();
class elMundo extends Web {
    constructor() {
        super("mundo");
        _elMundo_instances.add(this);
        _elMundo_url.set(this, "https://www.elmundo.es/");
    }
    extraerDatos() {
        return new Promise((resolve, reject) => {
            this.extraer(__classPrivateFieldGet(this, _elMundo_url, "f")).then(body => {
                var { window: { document } } = new jsdom_1.default.JSDOM(body);
                var urls = [...document.querySelector("div[data-b-name=ad_news_a]").querySelectorAll("article>a")].map(a => { return a.href; });
                let promises = [];
                for (let i = 0; i < urls.length; i++) {
                    promises.push(__classPrivateFieldGet(this, _elMundo_instances, "m", _elMundo_extraerNoticia).call(this, urls[i]));
                }
                Promise.all(promises).then(res => {
                    resolve(true);
                });
            });
        });
    }
}
_elMundo_url = new WeakMap(), _elMundo_instances = new WeakSet(), _elMundo_extraerNoticia = function _elMundo_extraerNoticia(url) {
    return new Promise((resolve, reject) => {
        this.extraer(url).then(body => {
            var { window: { document } } = new jsdom_1.default.JSDOM(body);
            let titulo = document.querySelector("h1.ue-c-article__headline").innerHTML;
            let cuerpo = document.querySelector("div.ue-c-article__body").innerHTML;
            this.addNoticia(titulo, cuerpo, url);
            resolve(true);
        });
    });
};
class elPais extends Web {
    constructor() {
        super("pais");
        _elPais_instances.add(this);
        _elPais_url.set(this, "https://elpais.com/actualidad/");
    }
    extraerDatos() {
        return new Promise((resolve, reject) => {
            this.extraer(__classPrivateFieldGet(this, _elPais_url, "f")).then(body => {
                var { window: { document } } = new jsdom_1.default.JSDOM(body);
                var urls = [...document.querySelector("section[data-dtm-region=portada_apertura]").querySelectorAll("article>header>h2>a")].map(a => { return a.href; });
                let promises = [];
                for (let i = 0; i < urls.length; i++) {
                    promises.push(__classPrivateFieldGet(this, _elPais_instances, "m", _elPais_extraerNoticia).call(this, urls[i]));
                }
                Promise.all(promises).then(res => {
                    resolve(true);
                });
            });
        });
    }
}
_elPais_url = new WeakMap(), _elPais_instances = new WeakSet(), _elPais_extraerNoticia = function _elPais_extraerNoticia(url) {
    return new Promise((resolve, reject) => {
        this.extraer(url).then(body => {
            var { window: { document } } = new jsdom_1.default.JSDOM(body);
            let titulo = document.querySelector("h1").innerHTML;
            let cuerpo = document.querySelector("article [data-dtm-region=articulo_cuerpo]").innerHTML;
            this.addNoticia(titulo, cuerpo, url);
            resolve(true);
        });
    });
};
function start() {
    var elmundo = new elMundo();
    elmundo.extraerDatos().then(() => {
        elmundo.guardar();
    });
    var elpais = new elPais();
    elpais.extraerDatos().then(() => {
        elpais.guardar();
    });
}
exports.default = {
    start
};
