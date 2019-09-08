const express = require('express');
const fs = require('fs')
const csv = require('fast-csv')
const Items = require('../Models/items')
const router = express.Router();

/** Dependencies*/
const Utils = require('../Utils/utils')

router.get('/addCsvItems', async (req, res, next) => {
    try {
        let savedItems = []
        const stream = fs.createReadStream('csv_files/Datos Prueba items.csv')
        const streamCsv = csv.parse({ headers: true, delimiter: ';'})
        .on('data', row => {
            streamCsv.pause();
            Items(Utils.ConvertKeysToLowerCase(row)).save(function (err,data){
                if(err) throw console.log(err);
                console.log(data)
                savedItems.push(data)
                streamCsv.resume();
            });
        }).on('end', () => {
            res.json(savedItems)
        } )
        stream.pipe(streamCsv, (data) => {
            console.log('ne:',data);
        });

        
    } catch (error) {
      next(error);
    }
}); 

router.get('/', async (req, res, next) => {
    const items = await Items.find();
    res.json(items);
})

module.exports = router;
