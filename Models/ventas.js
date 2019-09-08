const mongoose = require('mongoose');
let Schema = mongoose.Schema;  
const usuarios = require('./usuarios')
const item = require('./items')
let ObjectId = Schema.ObjectId;  

const ventaSchema =  new mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId,
    item: Number,
    vendedor: String,
    cantidad: Number,
    fecha: Date,
    vendedor_id: { type: mongoose.Schema.ObjectId, ref: 'Usuarios' },
    item_id : { type: mongoose.Schema.ObjectId, ref: 'Items' },//[{ type: Schema.Types.ObjectId, ref: 'item' }],
});

const Ventas = mongoose.model('Ventas',ventaSchema);
module.exports = Ventas;