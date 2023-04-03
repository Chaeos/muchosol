var api = require("express").Router();
var auth = require("../middlewares");

var feedsCtrl = require("../controllers/feeds");

api.put("/add",[auth.isAuth], feedsCtrl.add);

// api.get("/get/all", feedsCtrl.getAll);
// 
// api.get("/get/elmundo", feedsCtrl.getMundo);
// 
// api.get("/get/elpais", feedsCtrl.send);
// 
// api.get("/get/custom", feedsCtrl.send);

module.exports = api;