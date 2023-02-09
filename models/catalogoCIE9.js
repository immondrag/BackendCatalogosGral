//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const CatalogoCIE9Schema = Schema({
claveCIE9 : { 
        type :String,
 }, 
procedimiento : { 
        type :String,
 }, 

});

CatalogoCIE9Schema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'CatalogoCIE9', CatalogoCIE9Schema );

