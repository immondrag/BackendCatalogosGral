/*
    TipoFactors
    ruta: '/api/tipoFactor'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getTipoFactor,
    crearTipoFactor,
    actualizarTipoFactor,
    borrarTipoFactor,
    getTipoFactorById
} = require('../controllers/tipoFactor')

const router = Router();

router.get( '/', getTipoFactor);

router.post( '/',
    [
        validarCampos
    ], 
    crearTipoFactor 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarTipoFactor
);

router.delete( '/:id',
    borrarTipoFactor
);

router.get( '/:id',
    getTipoFactorById
);

module.exports = router;

