var token = require('../services/token');

function isAuth (req,res,next) {
    
    if (!req.headers.authorization) {

        return next({code:403,message:"Permisos insuficientes"});
    }
    
    token.decode(req.headers.authorization).then(response => {
        
        next();
    })
    .catch(next);
}

module.exports = {
    
    isAuth
}