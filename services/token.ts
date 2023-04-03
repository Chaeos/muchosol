import { encode, decode } from "jwt-simple";

import config from "../config";

function encodeJWT (str) {

    return encode(str, config.secret_token);
}

function decodeJWT (token) {

    return new Promise((resolve, reject) => {

        try {

            resolve(decode(token.split("Bearer ")[1], config.secret_token));

        } catch (err) {

            reject({code:500});
        }
    });
}


export default {
    
    encodeJWT,
    decodeJWT
};