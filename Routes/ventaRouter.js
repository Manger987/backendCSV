const express = require('express');
const fs = require('fs')
const csv = require('fast-csv')
const Ventas = require('../Models/ventas')
const User = require('../Models/usuarios')
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
            row.vendedor_id = (user._id) ? user._id : undefined;
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
    // let usuarioVentas = await User
    // .findOne({ usuario: 'abustos' })
    // .populate('ventas') // <-- only works if you pushed refs to children
    // .exec()
    let ventas = []
    let usuarioVentas = await Ventas.find({vendedor: req.params.id}).exec()
    usuarioVentas = await usuarioVentas.map(async (venta) => {
        //console.log('Venta',venta)
        // Item.findOne({codigo: venta.item}).exec().then((data) => {
        //     venta.monto_facturado = parseInt(data.precio * venta.cantidad)
        // })
        // const item = Item.findOne({codigo: venta.item}).exec()
        // console.log('item:',item)
        const invoicedAmount = await Utils.calculateCountSalesByItem(venta.item,venta.cantidad)//.then((data) => console.log(data))// Monto Facturado por cantidad de Item
        venta.invoicedAmount = parseInt(invoicedAmount)
        
        ventas.push(venta)
        console.log('vennntas',venta)
        return venta
    })
    console.log('VENTAS:',ventas)
    res.send(usuarioVentas)
})

module.exports = router;
