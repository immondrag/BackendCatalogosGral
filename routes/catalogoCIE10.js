/*
    CatalogoCIE10s
    ruta: '/api/catalogoCIE10'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getCatalogoCIE10,
    crearCatalogoCIE10,
    actualizarCatalogoCIE10,
    borrarCatalogoCIE10,
    getCatalogoCIE10ById
} = require('../controllers/catalogoCIE10')

const router = Router();

router.get( '/', getCatalogoCIE10);

router.post( '/',
    [
        validarCampos
    ], 
    crearCatalogoCIE10 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarCatalogoCIE10
);

router.delete( '/:id',
    borrarCatalogoCIE10
);

router.get( '/:id',
    getCatalogoCIE10ById
);

module.exports = router;

