/*
    NumPedimentoAduanas
    ruta: '/api/numPedimentoAduana'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getNumPedimentoAduana,
    crearNumPedimentoAduana,
    actualizarNumPedimentoAduana,
    borrarNumPedimentoAduana,
    getNumPedimentoAduanaById
} = require('../controllers/numPedimentoAduana')

const router = Router();

router.get( '/', getNumPedimentoAduana);

router.post( '/',
    [
        validarCampos
    ], 
    crearNumPedimentoAduana 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarNumPedimentoAduana
);

router.delete( '/:id',
    borrarNumPedimentoAduana
);

router.get( '/:id',
    getNumPedimentoAduanaById
);

module.exports = router;

