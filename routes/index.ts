import { Router } from 'express';

import auth from "../middlewares";

const api = Router();

const feedsCtrl = require("../controllers/feeds");

api.put("/add",[auth.isAuth], feedsCtrl.add);

api.get("/get/:type", feedsCtrl.get);

module.exports = api;