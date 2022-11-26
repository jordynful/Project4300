const mongoose = require('mongoose');
const { RedIntegerFormat } = require('three');

// Schema
const Schema = mongoose.Schema;
const ModuleSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    facts: String
});

// Model
const Module = mongoose.model('horizontal', ModuleSchema);

module.exports =  Module;