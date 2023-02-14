/*
    TipoComprobantes
    ruta: '/api/tipoComprobante'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getTipoComprobante,
    crearTipoComprobante,
    actualizarTipoComprobante,
    borrarTipoComprobante,
    getTipoComprobanteById
} = require('../../controllers/sat/tipoComprobante')

const router = Router();

router.get( '/', getTipoComprobante);

router.post( '/',
    [
        validarCampos
    ], 
    crearTipoComprobante 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarTipoComprobante
);

router.delete( '/:id',
    borrarTipoComprobante
);

router.get( '/:id',
    getTipoComprobanteById
);

module.exports = router;

