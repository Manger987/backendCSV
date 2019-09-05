
const Item = require('./../Models/items')
module.exports = {
    ConvertKeysToLowerCase(obj) {
        let output = {};
        for (i in obj) {
            if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
            output[i.toLowerCase()] = ConvertKeysToLowerCase(obj[i]);
            }else if(Object.prototype.toString.apply(obj[i]) === '[object Array]'){
                output[i.toLowerCase()]=[];
                output[i.toLowerCase()].push(ConvertKeysToLowerCase(obj[i][0]));
            } else {
                output[i.toLowerCase()] = obj[i];
            }
        }
        return output;
    },

     calculateCountSalesByItem(codigo,count) {
        const calculo = Item.findOne({ codigo : codigo })
        .exec()
        .then(data => {
            return parseInt(data.precio * count)
        })
        .catch(err => errorHandler.handle('audienceService', err));
        return calculo;
    },

    readSaveVentas () {
        const stream = fs.createReadStream('csv_files/Datos Prueba ventas.csv')
        const streamCsv = csv.parse({ headers: true, delimiter: ';'})
        .on('data', row => {
            Ventas(this.ConvertKeysToLowerCase(row)).save(function async(err,data){
                if(err) throw console.log(err);
                console.log(data);
            });
        }).on('end', data => { return data })
        stream.pipe(streamCsv);
    },
    
    readSaveUsuarios(){
        const stream = fs.createReadStream('csv_files/Datos Prueba usuarios.csv')
        const streamCsv = csv.parse({ headers: true, delimiter: ';'})
        .on('data', row => {
            Usuarios(this.ConvertKeysToLowerCase(row)).save(function async(err,data){
                if(err) throw console.log(err);
                console.log(data);
            });
        }).on('end', data => { return data })
        stream.pipe(streamCsv);
    },
    
    readSaveItems(){
        
    }
    
}