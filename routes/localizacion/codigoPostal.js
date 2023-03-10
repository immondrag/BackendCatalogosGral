/*
    CodigoPostals
    ruta: '/api/codigoPostal'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getCodigoPostal,
    crearCodigoPostal,
    actualizarCodigoPostal,
    borrarCodigoPostal,
    getCodigoPostalById
} = require('../../controllers/localizacion/codigoPostal')

const router = Router();

router.get( '/', getCodigoPostal);

router.post( '/',
    [
        validarCampos
    ], 
    crearCodigoPostal 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarCodigoPostal
);

router.delete( '/:id',
    borrarCodigoPostal
);

router.get( '/:id',
    getCodigoPostalById
);

module.exports = router;

