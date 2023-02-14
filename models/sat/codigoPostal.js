//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const CodigoPostalSchema = Schema({
    id: {
        type: String,
      },
      c_Estado: {
        type: String,
      },
      c_Municipio: {
        type: String,
      },
      c_Localidad: {
        type: String,
      },
      estimuloFranjaFronteriza: {
        type: String,
      },
      fechaInicioDeVigencia: {
        type: String,
      },
      fechaFinDeVigencia: {
        type: String,
      },
      referenciasDelHusoHorario: {
        type: String,
      },
});

CodigoPostalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'CodigoPostal', CodigoPostalSchema );

