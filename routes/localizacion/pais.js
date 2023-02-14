/*
    Paiss
    ruta: '/api/pais'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getPais,
    crearPais,
    actualizarPais,
    borrarPais,
    getPaisById
} = require('../../controllers/localizacion/pais')

const router = Router();

router.get( '/', getPais);

router.post( '/',
    [
        validarCampos
    ], 
    crearPais 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarPais
);

router.delete( '/:id',
    borrarPais
);

router.get( '/:id',
    getPaisById
);

module.exports = router;

