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
app.use( '/api/catalogoCIE9', require('./routes/catalogoCIE9') );
app.use( '/api/catalogoCIE10', require('./routes/catalogoCIE10') );
app.use( '/api/catalogoGeneral', require('./routes/catalogoGeneral') );

//SAT
app.use( '/api/estado', require('./routes/estado') );
app.use( '/api/impuesto', require('./routes/impuesto') );
app.use( '/api/localidad', require('./routes/localidad') );
app.use( '/api/meses', require('./routes/meses') );
app.use( '/api/metodoPago', require('./routes/metodoPago') );
app.use( '/api/moneda', require('./routes/moneda') );
app.use( '/api/municipio', require('./routes/municipio') );
app.use( '/api/numPedimentoAduana', require('./routes/numPedimentoAduana') );
app.use( '/api/objetoImp', require('./routes/objetoImp') );
app.use( '/api/pais', require('./routes/pais') );
app.use( '/api/patenteAduanal', require('./routes/patenteAduanal') );
app.use( '/api/periodicidad', require('./routes/periodicidad') );
app.use( '/api/regimenFiscal', require('./routes/regimenFiscal') );
app.use( '/api/tasaOCuota', require('./routes/tasaOCuota') );
app.use( '/api/tipoComprobante', require('./routes/tipoComprobante') );
app.use( '/api/tipoFactor', require('./routes/tipoFactor') );
app.use( '/api/tipoRelacion', require('./routes/tipoRelacion') );
app.use( '/api/usoCFDI', require('./routes/usoCFDI') );
app.use( '/api/aduana', require('./routes/aduana') );
app.use( '/api/claveProdServ', require('./routes/claveProdServ') );
app.use( '/api/claveUnidad', require('./routes/claveUnidad') );
app.use( '/api/codigoPostal', require('./routes/codigoPostal') );
app.use( '/api/colonia', require('./routes/colonia') );
app.use( '/api/exportacion', require('./routes/exportacion') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});


