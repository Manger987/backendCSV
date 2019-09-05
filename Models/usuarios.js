const mongoose = require('mongoose');
const ventas = require('./ventas')
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const usuariosSchema =  new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    usuario: String,
    nombre: String,
    apellido: String,
    email: String,
    ventas: [{ type: Schema.Types.ObjectId, ref: 'Ventas' }]
});

const Usuarios = mongoose.model('Usuarios',usuariosSchema);
module.exports = Usuarios;