const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const VertSchema = new Schema({
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    facts: String
});

// Model
const Vert = mongoose.model('vertical', VertSchema);

module.exports =  Vert;