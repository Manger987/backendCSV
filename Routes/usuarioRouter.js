const express = require('express');
const fs = require('fs')
const csv = require('fast-csv')
const mongoose = require('mongoose');
const Ventas = require('../Models/ventas')
const User = require('../Models/usuarios')
const Utils = require('../Utils/utils')

const router = express.Router();

router.get('/addCsvUsers', async (req, res, next) => {
    try {
        let savedUsers = []
        const stream = fs.createReadStream('csv_files/Datos Prueba usuarios.csv')
        const streamCsv = csv.parse({ headers: true, delimiter: ';'})
        .on('data', row => {
            console.log('row:',row)
            streamCsv.pause();
            User(Utils.ConvertKeysToLowerCase(row)).save(function (err,data){
                if(err) throw console.log(err);
                savedUsers.push(data)
                streamCsv.resume();
            });
        }).on('end', () => {
            res.json(savedUsers)
        })
        stream.pipe(streamCsv);

        
    } catch (error) {
      next(error);
    }
}); 

router.get('/getUsers', async (req, res, next) => {
    const users = await User.find();
    res.json(users);
})

router.get('/validate/:usuario', async (req, res, next) => {
    const users = await User.find({usuario:req.params.usuario}).populate('ventas').exec()
    res.json(users);
})

module.exports = router;
