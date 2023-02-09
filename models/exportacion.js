//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const ExportacionSchema = Schema({
    id: {
        type: String,
      },
      descripcion: {
        type: String,
      },
      fechaInicioDeVigencia: {
        type: String,
      },

});

ExportacionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Exportacion', ExportacionSchema );

