/*
    ClaveUnidads
    ruta: '/api/claveUnidad'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getClaveUnidad,
    crearClaveUnidad,
    actualizarClaveUnidad,
    borrarClaveUnidad,
    getClaveUnidadById
} = require('../controllers/claveUnidad')

const router = Router();

router.get( '/', getClaveUnidad);

router.post( '/',
    [
        validarCampos
    ], 
    crearClaveUnidad 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarClaveUnidad
);

router.delete( '/:id',
    borrarClaveUnidad
);

router.get( '/:id',
    getClaveUnidadById
);

module.exports = router;

