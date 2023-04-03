var Feed = require("../models/feed");
var moment = require("moment");

function add (req,res,next) {

    if(req.body.fecha) {
    
        var date = moment(req.body.fecha);
    
        if(!date.isValid()) return next({code:400,message:"Error en la fecha, debe tener el formato YYYY-MM-DD"});
    }
    
    let feed = new Feed({titulo:req.body.titulo,cuerpo:req.body.cuerpo,fecha:req.body.fecha});
    
    feed.save().then(feed => {
    
        next({code:200,message:"Feed insertado corectamente"});
    })
    .catch(next);
}

module.exports = {
    
    add
}