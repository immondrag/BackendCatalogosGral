//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const ColoniaSchema = Schema({
    c_Colonia: {
        type: String,
      },
      c_CodigoPostal: {
        type: String,
      },
      nombreDelAsentamiento: {
        type: String,
      },
});

ColoniaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Colonia', ColoniaSchema );

