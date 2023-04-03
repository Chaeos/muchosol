import mongoose from "mongoose";
import { CronJob } from "cron";

import scraping from "./services/scraping";
import config from "./config";
import app from "./app";

app.listen(config.port, () => {

    console.log("----------------------- API REST :" + config.port + " -----------------------");

    mongoose.connect('mongodb://127.0.0.1/feeds').then(() => {

        console.log("--------------------- MONGO DB CONNECTED ---------------------");
    });
});

new CronJob("0 0 0 * * *", () => {

    scraping.start();

}).start();