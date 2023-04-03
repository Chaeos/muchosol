var Feed = require("../models/feed");
var puppeteer = require('puppeteer');
var moment = require("moment");
var jsdom = require('jsdom');

class Web {

    #noticias = [];
    #type = "";

    constructor(type) {
        
        this.#type = type;
    }

    extraer(url) {
    
        return new Promise((resolve, reject) => {
            
            puppeteer.launch().then(browser => {
                
                browser.newPage().then(page => {
                    
                    page.goto(url).then(result => {
                        
                        result.text().then(body => {
                            
                            resolve(body);
                            
                            browser.close();
                        });
                    });
                });
            });
        });
    }
    
    addNoticia(titulo,cuerpo,enlace) {
        
        this.#noticias.push({titulo:titulo,cuerpo:cuerpo,enlace:enlace});
    }
    
    guardar() {
        
        return new Promise((resolve, reject) => {
            
            let fecha = moment().format('YYYY-MM-DD');
            let promises = [];
            
            Feed.deleteMany({fecha:fecha,type:this.#type}).then(() => {
            
                for(let i = 0;i<this.#noticias.length;i++) {
                    
                    let feed = new Feed({titulo:this.#noticias[i].titulo,cuerpo:this.#noticias[i].cuerpo,enlace:this.#noticias[i].enlace,type:this.#type,fecha:fecha});
                    
                    promises.push(feed.save());
                }
                
                Promise.all(promises).then(res => {
                    
                    resolve();
                });
            });
        });
    }
}

class elMundo extends Web {
    
    #url = "https://www.elmundo.es/";
    
    constructor() {
        
        super("mundo");
    }
    
    #extraerNoticia(url) {
        
        return new Promise((resolve, reject) => {
                
            super.extraer(url).then(body => {
                
                var { window: { document } } = new jsdom.JSDOM(body);
                
                let titulo = document.querySelector("h1.ue-c-article__headline").innerHTML;
                let cuerpo = document.querySelector("div.ue-c-article__body").innerHTML;
                
                super.addNoticia(titulo,cuerpo,url);
                resolve();
            });
        });
    }
    
    extraerDatos() {
        
        return new Promise((resolve, reject) => {
            
            super.extraer(this.#url).then(body => {

                var { window: { document } } = new jsdom.JSDOM(body);
                
                var urls = [...document.querySelector("div[data-b-name=ad_news_a]").querySelectorAll("article>a")].map(a=>{return a.href});
                
                let promises = [];
                
                for(let i = 0;i<urls.length;i++) {
                    
                    promises.push(this.#extraerNoticia(urls[i]));
                }
                
                Promise.all(promises).then(res => {
                    
                    resolve();
                });
            });
        });
    }
}

class elPais extends Web {
    
    #url = "https://elpais.com/actualidad/";
    
    constructor() {
        
        super("pais");
    }
    
    #extraerNoticia(url) {
        
        return new Promise((resolve, reject) => {
                
            super.extraer(url).then(body => {
                
                var { window: { document } } = new jsdom.JSDOM(body);
                
                let titulo = document.querySelector("h1").innerHTML;
                let cuerpo = document.querySelector("article [data-dtm-region=articulo_cuerpo]").innerHTML;
                
                super.addNoticia(titulo,cuerpo,url);
                resolve();
            });
        });
    }
    
    extraerDatos() {
        
        return new Promise((resolve, reject) => {
            
            super.extraer(this.#url).then(body => {

                var { window: { document } } = new jsdom.JSDOM(body);
                
                var urls = [...document.querySelector("section[data-dtm-region=portada_apertura]").querySelectorAll("article>header>h2>a")].map(a=>{return a.href});
                
                let promises = [];
                
                for(let i = 0;i<urls.length;i++) {
                    
                    promises.push(this.#extraerNoticia(urls[i]));
                }
                
                Promise.all(promises).then(res => {
                    
                    resolve();
                });
            });
        });
    }
}

function start () {

    var elmundo = new elMundo();
    
    elmundo.extraerDatos().then(() => {
        
        elmundo.guardar();
    });
    
    var elpais = new elPais();
    
    elpais.extraerDatos().then(() => {
        
        elpais.guardar();
    });
}

module.exports = {
    
    start
};