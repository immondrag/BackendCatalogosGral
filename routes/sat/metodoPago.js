/*
    MetodoPagos
    ruta: '/api/metodoPago'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getMetodoPago,
    crearMetodoPago,
    actualizarMetodoPago,
    borrarMetodoPago,
    getMetodoPagoById
} = require('../../controllers/sat/metodoPago')

const router = Router();

router.get( '/', getMetodoPago);

router.post( '/',
    [
        validarCampos
    ], 
    crearMetodoPago 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarMetodoPago
);

router.delete( '/:id',
    borrarMetodoPago
);

router.get( '/:id',
    getMetodoPagoById
);

module.exports = router;

