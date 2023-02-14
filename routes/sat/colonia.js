/*
    Colonias
    ruta: '/api/colonia'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getColonia,
    crearColonia,
    actualizarColonia,
    borrarColonia,
    getColoniaById
} = require('../../controllers/sat/colonia')

const router = Router();

router.get( '/', getColonia);

router.post( '/',
    [
        validarCampos
    ], 
    crearColonia 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarColonia
);

router.delete( '/:id',
    borrarColonia
);

router.get( '/:id',
    getColoniaById
);

module.exports = router;

