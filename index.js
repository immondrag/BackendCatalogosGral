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

//SAT
app.use( '/api/estado', require('./routes/sat/estado') );
app.use( '/api/impuesto', require('./routes/sat/impuesto') );
app.use( '/api/localidad', require('./routes/sat/localidad') );
app.use( '/api/meses', require('./routes/sat/meses') );
app.use( '/api/metodoPago', require('./routes/sat/metodoPago') );
app.use( '/api/moneda', require('./routes/sat/moneda') );
app.use( '/api/municipio', require('./routes/sat/municipio') );
app.use( '/api/numPedimentoAduana', require('./routes/sat/numPedimentoAduana') );
app.use( '/api/objetoImp', require('./routes/sat/objetoImp') );
app.use( '/api/pais', require('./routes/sat/pais') );
app.use( '/api/patenteAduanal', require('./routes/sat/patenteAduanal') );
app.use( '/api/periodicidad', require('./routes/sat/periodicidad') );
app.use( '/api/regimenFiscal', require('./routes/sat/regimenFiscal') );
app.use( '/api/tasaOCuota', require('./routes/sat/tasaOCuota') );
app.use( '/api/tipoComprobante', require('./routes/sat/tipoComprobante') );
app.use( '/api/tipoFactor', require('./routes/sat/tipoFactor') );
app.use( '/api/tipoRelacion', require('./routes/sat/tipoRelacion') );
app.use( '/api/usoCFDI', require('./routes/sat/usoCFDI') );
app.use( '/api/aduana', require('./routes/sat/aduana') );
app.use( '/api/claveProdServ', require('./routes/sat/claveProdServ') );
app.use( '/api/claveUnidad', require('./routes/sat/claveUnidad') );
app.use( '/api/codigoPostal', require('./routes/sat/codigoPostal') );
app.use( '/api/colonia', require('./routes/sat/colonia') );
app.use( '/api/exportacion', require('./routes/sat/exportacion') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});


