const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const menuItemSchema = new Schema({
    id: String,
    title: String,
    description: String,
});

// Model
const MenuItem = mongoose.model('menuItem', PicSchema);

module.exports =  MenuItem;