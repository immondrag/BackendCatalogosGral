//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const LocalidadSchema = Schema({
    c_Localidad: {
        type: String,
      },
      c_Estado: {
        type: String,
      },
      descripcion: {
        type: String,
      },
      fechaDeInicioDeVigencia: {
        type: String,
      },
      fechaDeFinDeVigencia: {
        type: String,
      },
});

LocalidadSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Localidad', LocalidadSchema );

