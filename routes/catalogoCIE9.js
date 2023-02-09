/*
    CatalogoCIE9s
    ruta: '/api/catalogoCIE9'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getCatalogoCIE9,
    crearCatalogoCIE9,
    actualizarCatalogoCIE9,
    borrarCatalogoCIE9,
    getCatalogoCIE9ById
} = require('../controllers/catalogoCIE9')

const router = Router();

router.get( '/', getCatalogoCIE9);

router.post( '/',
    [
        validarCampos
    ], 
    crearCatalogoCIE9 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarCatalogoCIE9
);

router.delete( '/:id',
    borrarCatalogoCIE9
);

router.get( '/:id',
    getCatalogoCIE9ById
);

module.exports = router;

