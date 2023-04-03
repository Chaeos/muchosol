import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
    
    titulo : {type: String},
    cuerpo:  {type: String},
    type:    {type: String, enum: ['mundo', 'pais', 'custom']},
    enlace:  {type: String},
    fecha :  {type: Date, default: Date.now()}
});

export const Feed = mongoose.model('Feed', FeedSchema);