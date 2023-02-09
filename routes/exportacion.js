/*
    Exportacions
    ruta: '/api/exportacion'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getExportacion,
    crearExportacion,
    actualizarExportacion,
    borrarExportacion,
    getExportacionById
} = require('../controllers/exportacion')

const router = Router();

router.get( '/', getExportacion);

router.post( '/',
    [
        validarCampos
    ], 
    crearExportacion 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarExportacion
);

router.delete( '/:id',
    borrarExportacion
);

router.get( '/:id',
    getExportacionById
);

module.exports = router;

