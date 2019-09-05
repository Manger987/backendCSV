const express = require('express');
const fs = require('fs')
const csv = require('fast-csv')
const Ventas = require('../Models/ventas')
const User = require('../Models/usuarios')
const mongoose = require('mongoose');
const router = express.Router();


/** Dependencies*/
const Utils = require('../Utils/utils')

router.get('/addCsvUsers', async (req, res, next) => {
    try {
        let savedUsers = []
        const stream = fs.createReadStream('csv_files/Datos Prueba usuarios.csv')
        const streamCsv = csv.parse({ headers: true, delimiter: ';'})
        .on('data', row => {
            //row._id = new mongoose.Types.ObjectId()
            console.log('row:',row)
            //streamCsv.pause();
            /*User(Utils.ConvertKeysToLowerCase(row)).save(function (err,data){
                if(err) throw console.log(err);
                console.log(data)
                savedUsers.push(data)
                streamCsv.resume();
            });*/
        }).on('end', () => {
            res.json(savedUsers)
        } )
        stream.pipe(streamCsv, (data) => {
            console.log('ne:',data);
        });

        
    } catch (error) {
      next(error);
    }
}); 

router.get('/getUsers', async (req, res, next) => {
    const users = await User.find();
    res.json(users);
})

module.exports = router;
