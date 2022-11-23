const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const PicSchema = new Schema({
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    facts: String
});

// Model
const Pic = mongoose.model('pic', PicSchema);

module.exports =  Pic;