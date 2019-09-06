const express = require('express');
const fs = require('fs')
const csv = require('fast-csv')
const User = require('../Models/usuarios')
const Ventas = require('../Models/ventas')
const Item = require('../Models/items')
const Utils = require('../Utils/utils')
let router = express.Router();

router.get('/addCsvSales', async (req, res, next) => {
    try {
        let savedVentas = []
        const stream = fs.createReadStream('csv_files/Datos Prueba ventas.csv')
        const streamCsv = csv.parse({ headers: true, delimiter: ';'})
        .on('data', async row => {
           streamCsv.pause();
           Utils.ConvertKeysToLowerCase(row)
            const user = await User.findOne({ usuario : row.vendedor }).exec(); 
            const item = await Item.findOne({ codigo : row.item }).exec(); 
            row.vendedor_id = (user._id) ? user._id : undefined;
            row.item_id = (item._id) ? item._id : undefined;
            Ventas(row).save(function (err,data){
                if(err) throw console.log(err.message);
                console.log(data)
                savedVentas.push(data)
                streamCsv.resume();
            });
        }).on('end', () => {
            res.json(savedVentas)
        } )
        stream.pipe(streamCsv);

        
    } catch (error) {
      next(error);
    }
}); 

router.get('/getSales', async (req, res, next) => {
    const sales = await Ventas.find();
    res.json(sales);
})

router.get('/getSalesBySeller/:id', async (req, res, next) => {
    Ventas.find({vendedor: req.params.id}).populate('item_id').exec()
    .then(async (data) => {
      array = [];
      data.map((sale,index) => {
        const saleObject = {
          item: sale.item,
          vendedor: sale.vendedor,
          cantidad: sale.cantidad,
          fecha: sale.fecha,
          vendedor_id: sale.vendedor_id,
          invoicedAmount: (sale.item_id.precio) ? parseInt(sale.item_id.precio * sale.cantidad) : 0
        } 
        array.push(saleObject);
        if( parseInt(index+1) === data.length) {
          res.json(array)
        }
      })
    })
})

router.get('/:id/getSalesByItem/:idItem', async (req, res, next) => {
  console.log("PARAMS:",req.params)
  Ventas.find({vendedor: req.params.id,item: req.params.idItem}).populate('item_id').exec()
    .then(async (data) => {
      array = [];
      data.map((sale,index) => {
        const saleObject = {
          item: sale.item,
          vendedor: sale.vendedor,
          cantidad: sale.cantidad,
          fecha: sale.fecha,
          vendedor_id: sale.vendedor_id,
          invoicedAmount: (sale.item_id.precio) ? parseInt(sale.item_id.precio * sale.cantidad) : 0
        } 
        array.push(saleObject);
        if( parseInt(index+1) === data.length) {
          res.json(array)
        }
      })
    })
})

module.exports = router;
