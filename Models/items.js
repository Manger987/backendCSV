const mongoose = require('mongoose');

const itemsSchema =  new mongoose.Schema({
    codigo: Number,
    descripcion: String,
    precio: String
});

const Items = mongoose.model('items',itemsSchema);
module.exports = Items;