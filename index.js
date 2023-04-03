var scraping = require("./services/scraping");
var CronJob = require("cron").CronJob;
var mongoose = require('mongoose');
var config = require("./config");
var app = require("./app");

app.listen(config.port, () => {

    console.log("----------------------- API REST :" + config.port + " -----------------------");
    
    mongoose.connect('mongodb://127.0.0.1/feeds', {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
        
        console.log("--------------------- MONGO DB CONNECTED ---------------------");
    });
});
    
new CronJob("0 0 0 * * *", () => {
    
    scraping.start();
    
}).start();