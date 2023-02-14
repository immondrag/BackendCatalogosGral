/*
    Periodicidads
    ruta: '/api/periodicidad'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getPeriodicidad,
    crearPeriodicidad,
    actualizarPeriodicidad,
    borrarPeriodicidad,
    getPeriodicidadById
} = require('../../controllers/sat/periodicidad')

const router = Router();

router.get( '/', getPeriodicidad);

router.post( '/',
    [
        validarCampos
    ], 
    crearPeriodicidad 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarPeriodicidad
);

router.delete( '/:id',
    borrarPeriodicidad
);

router.get( '/:id',
    getPeriodicidadById
);

module.exports = router;

