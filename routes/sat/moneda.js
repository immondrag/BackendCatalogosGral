/*
    Monedas
    ruta: '/api/moneda'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getMoneda,
    crearMoneda,
    actualizarMoneda,
    borrarMoneda,
    getMonedaById
} = require('../../controllers/sat/moneda')

const router = Router();

router.get( '/', getMoneda);

router.post( '/',
    [
        validarCampos
    ], 
    crearMoneda 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarMoneda
);

router.delete( '/:id',
    borrarMoneda
);

router.get( '/:id',
    getMonedaById
);

module.exports = router;

