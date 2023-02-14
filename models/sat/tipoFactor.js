//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const TipoFactorSchema = Schema({
    id: {
        type: String,
      },
      fechaInicioDeVigencia: {
        type: String,
      },
      fechaFinDeVigencia: {
        type: String,
      },

});

TipoFactorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'TipoFactor', TipoFactorSchema );

