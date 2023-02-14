require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
// Crear el servidor de express
const app = express();
// Configurar CORS
app.use( cors() );
// Lectura y parseo del body
app.use( express.json() );
// Base de datos
dbConnection();
//<%Catalogolinea%>app.use( '/api/<%PLMi-claveDocumento%>', require('./routes/<%PLMi-claveDocumento%>') );
app.use( '/api/catalogoCIE9', require('./routes/medicos/catalogoCIE9') );
app.use( '/api/catalogoCIE10', require('./routes/medicos/catalogoCIE10') );
app.use( '/api/catalogoGeneral', require('./routes/generales/catalogoGeneral') );
//localizacion
app.use( '/api/localidad', require('./routes/localizacion/localidad') );
app.use( '/api/municipio', require('./routes/localizacion/municipio') );
app.use( '/api/pais', require('./routes/localizacion/pais') );
app.use( '/api/estado', require('./routes/localizacion/estado') );
app.use( '/api/codigoPostal', require('./routes/localizacion/codigoPostal') );
app.use( '/api/colonia', require('./routes/localizacion/colonia') );

//SAT
app.use( '/api/metodoPago', require('./routes/sat/metodoPago') );
app.use( '/api/numPedimentoAduana', require('./routes/sat/numPedimentoAduana') );
app.use( '/api/regimenFiscal', require('./routes/sat/regimenFiscal') );
app.use( '/api/tasaOCuota', require('./routes/sat/tasaOCuota') );
app.use( '/api/tipoComprobante', require('./routes/sat/tipoComprobante') );
app.use( '/api/usoCFDI', require('./routes/sat/usoCFDI') );
app.use( '/api/claveProdServ', require('./routes/sat/claveProdServ') );
app.use( '/api/claveUnidad', require('./routes/sat/claveUnidad') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});


