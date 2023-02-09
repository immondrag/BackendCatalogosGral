//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const PaisSchema = Schema({
    id: {
        type: String,
      },
      descripcion: {
        type: String,
      },
      formatoDeCodigoPostal: {
        type: String,
      },
      formatoDeRegistroDeIdentidadTributaria: {
        type: String,
      },
      validacionDelRegistroDeIdentidadTributaria: {
        type: String,
      },
      agrupaciones: {
        type: String,
      },
});

PaisSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Pais', PaisSchema );

