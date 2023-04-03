"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cron_1 = require("cron");
const scraping_1 = __importDefault(require("./services/scraping"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
app_1.default.listen(config_1.default.port, () => {
    console.log("----------------------- API REST :" + config_1.default.port + " -----------------------");
    mongoose_1.default.connect('mongodb://127.0.0.1/feeds').then(() => {
        console.log("--------------------- MONGO DB CONNECTED ---------------------");
    });
});
new cron_1.CronJob("0 0 0 * * *", () => {
    scraping_1.default.start();
}).start();
