/*
    Localidads
    ruta: '/api/localidad'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getLocalidad,
    crearLocalidad,
    actualizarLocalidad,
    borrarLocalidad,
    getLocalidadById
} = require('../controllers/localidad')

const router = Router();

router.get( '/', getLocalidad);

router.post( '/',
    [
        validarCampos
    ], 
    crearLocalidad 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarLocalidad
);

router.delete( '/:id',
    borrarLocalidad
);

router.get( '/:id',
    getLocalidadById
);

module.exports = router;

