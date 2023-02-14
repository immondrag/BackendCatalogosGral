//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const MunicipioSchema = Schema({
    c_Municipio: {
        type: String,
      },
      c_Estado: {
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

MunicipioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Municipio', MunicipioSchema );

