const mongoose = require('mongoose');
const ventas = require('./ventas')

const itemSchema =  new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    codigo: Number,
    descripcion: String,
    precio: String
});

const Items = mongoose.model('Items',itemSchema);
module.exports = Items;