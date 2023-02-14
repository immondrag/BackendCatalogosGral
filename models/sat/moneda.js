//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const MonedaSchema = Schema({
    id: {
        type: String,
      },
      descripcion: {
        type: String,
      },
      decimales: {
        type: String,
      },
      porcentajeVariacion: {
        type: String,
      },
      fechaInicioDeVigencia: {
        type: String,
      },
      fechaFinDeVigencia: {
        type: String,
      },
});

MonedaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Moneda', MonedaSchema );

