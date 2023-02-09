/*
    TipoRelacions
    ruta: '/api/tipoRelacion'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getTipoRelacion,
    crearTipoRelacion,
    actualizarTipoRelacion,
    borrarTipoRelacion,
    getTipoRelacionById
} = require('../controllers/tipoRelacion')

const router = Router();

router.get( '/', getTipoRelacion);

router.post( '/',
    [
        validarCampos
    ], 
    crearTipoRelacion 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarTipoRelacion
);

router.delete( '/:id',
    borrarTipoRelacion
);

router.get( '/:id',
    getTipoRelacionById
);

module.exports = router;

