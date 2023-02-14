//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const TipoRelacionSchema = Schema({
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

TipoRelacionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'TipoRelacion', TipoRelacionSchema );

