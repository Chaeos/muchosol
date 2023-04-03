import { Feed } from "../models/feed";
import moment from "moment";

function add (req,res,next) {

    if(req.body.fecha) {
    
        var date = moment(req.body.fecha);
    
        if(!date.isValid()) return next({code:400,message:"Error en la fecha, debe tener el formato YYYY-MM-DD"});
    }
    
    let feed = new Feed({titulo:req.body.titulo,cuerpo:req.body.cuerpo,fecha:req.body.fecha,type:'custom',enlace:req.body.enlace});
    
    feed.save().then(feed => {
    
        next({code:200,message:"Feed insertado corectamente"});
    })
    .catch(next);
}

function get (req,res,next) {
    
    let params = {};
    
    if(req.params.type == 'mundo' || req.params.type == 'pais' || req.params.type == 'custom') params = {type:req.params.type};
    
    Feed.find(params).then(results => {
        
        next({code:200,message:results});
    });
}

module.exports = {
    
    get,
    add
}