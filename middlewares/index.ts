import token from "../services/token";

function isAuth (req,res,next) {
    
    if (!req.headers.authorization) {

        return next({code:403,message:"Permisos insuficientes"});
    }
    
    token.decodeJWT(req.headers.authorization).then(response => {
        
        next();
    })
    .catch(next);
}

export default {
    
    isAuth
}