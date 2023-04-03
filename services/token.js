var config = require("../config");
var hwt = require("jwt-simple");

function encode (str) {

    return hwt.encode(str, config.secret_token);
}

function decode (token) {

    return new Promise((resolve, reject) => {

        try {

            resolve(hwt.decode(token.split("Bearer ")[1], config.secret_token));

        } catch (err) {

            reject({code:500});
        }
    });
}


module.exports = {
    
    encode,
    decode
};