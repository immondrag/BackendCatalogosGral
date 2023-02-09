//<%IniModeloBC%>
const { Schema, model, Decimal128 } = require('mongoose');
const PatenteAduanalSchema = Schema({
    c_PatenteAduanal: {
        type: String,
      },
      inicioDeVigenciaDeLaPatente: {
        type: String,
      },
      finDeVigenciaDeLaPatente: {
        type: String,
      },
});

PatenteAduanalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'PatenteAduanal', PatenteAduanalSchema );

