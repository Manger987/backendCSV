const mongoose = require('mongoose');
const usuarios = require('./usuarios')
const item = require('./items')
let Schema = mongoose.Schema;  
let ObjectId = Schema.ObjectId;  

const VentasSchema =  new mongoose.Schema({
    item: Number,//[{ type: Schema.Types.ObjectId, ref: 'item' }],
    vendedor: String,
    cantidad: Number,
    fecha: Date,
    vendedor_id: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
});



const Ventas = mongoose.model('Ventas',VentasSchema);
module.exports = Ventas;