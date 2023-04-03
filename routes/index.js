var api = require("express").Router();
var auth = require("../middlewares");

var feedsCtrl = require("../controllers/feeds");

api.put("/add",[auth.isAuth], feedsCtrl.add);

api.get("/get/:type", feedsCtrl.get);

module.exports = api;