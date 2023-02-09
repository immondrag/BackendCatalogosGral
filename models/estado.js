//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const EstadoSchema = Schema({
    id: {
        type: String,
      },
      c_Pais: {
        type: String,
      },
      nombreDelEstado: {
        type: String,
      },
      fechaInicioDeVigencia: {
        type: String,
      },
      fechaFinDeVigencia: {
        type: String,
      },

});

EstadoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Estado', EstadoSchema );

