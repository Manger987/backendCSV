//Import the mongoose module
const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb://usuarioMarsol:usuarioMarsol1@ds217208.mlab.com:17208/desarrollo_prueba_marsol', { useNewUrlParser: true })
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));