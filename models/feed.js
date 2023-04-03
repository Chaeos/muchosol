var mongoose = require('mongoose');
var config = require('../config');

var FeedSchema = new mongoose.Schema({
    
    titulo : {type: String},
    cuerpo:  {type: String},
    type:    {type: String, enum: ['mundo', 'pais', 'custom']},
    enlace:  {type: String},
    fecha :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Feed', FeedSchema);