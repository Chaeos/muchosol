var express = require("express");
var cors = require("cors");
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));

app.use((item, req, res, next) => {

    if (!item.code) item.code = item.statusCode;

    try {
        
        if (!item.code) {
            
            res.sendStatus(500);
            console.log(item);
        }
        else {

            if(item.message) {
                
                res.status(item.code).send(item.message);
            }
            else {
                
                res.sendStatus(item.code);
            }
        }
    }
    catch (e) {

        res.status(500).send('Internal Server Error');
        console.log(item);
    }
});

module.exports = app;