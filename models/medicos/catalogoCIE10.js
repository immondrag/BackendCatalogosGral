//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const CatalogoCIE10Schema = Schema({
claveCIE10 : { 
        type :String,
 }, 
diagnostico : { 
        type :String,
 }, 
});

CatalogoCIE10Schema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'CatalogoCIE10', CatalogoCIE10Schema );

