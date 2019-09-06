const express = require('express');
const bodyParser = require('body-parser')
const db = require('./database')
const Usuarios = require('./Models/usuarios')
const Ventas = require('./Models/ventas')
const Items = require('./Models/items')
const Utils = require('./Utils/utils')
const cors = require('cors')
const ventaRoutes = require('./Routes/ventaRouter');
const itemRoutes = require('./Routes/itemRouter');
const userRoutes = require('./Routes/usuarioRouter');

const app = express()

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, letious SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

exports.Utils = Utils;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// readSaveItems()
// readSaveVentas()
// readSaveUsuarios()

/*app.get('/', function(req, res) {
  res.send('hello world');
});*/
app.use('/ventas', ventaRoutes);
app.use('/items', itemRoutes);
app.use('/users', userRoutes);


app.listen(2000, () => console.log('Escuchando por el puerto 2000!!!'));