//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const PeriodicidadSchema = Schema({
    id: {
        type: String,
      },
      descripcion: {
        type: String,
      },
      fechaInicioDeVigencia: {
        type: String,
      },
      fechaFinDeVigencia: {
        type: String,
      },

});
0
PeriodicidadSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Periodicidad', PeriodicidadSchema );

