/*
    Aduanas
    ruta: '/api/aduana'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getAduana,
    crearAduana,
    actualizarAduana,
    borrarAduana,
    getAduanaById
} = require('../controllers/aduana')

const router = Router();

router.get( '/', getAduana);

router.post( '/',
    [
        validarCampos
    ], 
    crearAduana 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarAduana
);

router.delete( '/:id',
    borrarAduana
);

router.get( '/:id',
    getAduanaById
);

module.exports = router;

