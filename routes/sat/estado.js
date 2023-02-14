/*
    Estados
    ruta: '/api/estado'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getEstado,
    crearEstado,
    actualizarEstado,
    borrarEstado,
    getEstadoById
} = require('../../controllers/sat/estado')

const router = Router();

router.get( '/', getEstado);

router.post( '/',
    [
        validarCampos
    ], 
    crearEstado 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarEstado
);

router.delete( '/:id',
    borrarEstado
);

router.get( '/:id',
    getEstadoById
);

module.exports = router;

