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
    let array = [];
    const sales = Ventas.find({vendedor: req.params.id}).populate('item_id').exec()

    const returnSales = await sales.then(async (data) => {
      data.forEach(sale =>{
        sale.invoicedAmount = (sale.item_id.precio) ? parseInt(sale.item_id.precio * sale.cantidad) : 0;
        return sale
      })
      console.log('datos:',datos)
      return datos
    })
    next(
      res.json(returnSales)
    )


    /*let ventas = []
    let usuarioVentas = await Ventas.find({vendedor: req.params.id}).exec()
    usuarioVentas = await usuarioVentas.map(async (venta) => {
        const invoicedAmount = await Utils.calculateCountSalesByItem(venta.item,venta.cantidad)//.then((data) => console.log(data))// Monto Facturado por cantidad de Item
        venta.invoicedAmount = parseInt(invoicedAmount)
        ventas.push(venta)
        console.log('vennntas',venta)
        return venta
    })
    console.log('VENTAS:',ventas)
    res.send(usuarioVentas)*/
   
   /* Ventas.find({vendedor: req.params.id})
    //.populate('item', 'precio')
    .exec()
    .then(async docs => {
        const sales = docs.map( doc => {
        const invoicedAmount =  Utils.calculateCountSalesByItem(doc.item,doc.cantidad)//.then((data) => console.log(data))// Monto Facturado por cantidad de Item
        
          const dev = {
            _id: doc._id,
            item: doc.item,
            vendedor: doc.vendedor,
            cantidad: doc.cantidad,
            fecha: doc.fecha, 
            invoicedAmount: invoicedAmount,
            vendedor_id: doc.vendedor_id,
            count: docs.length
          }
          return dev
      });
     res.send(sales);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });*/
})

module.exports = router;
