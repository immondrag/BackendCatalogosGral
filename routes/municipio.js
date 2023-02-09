/*
    Municipios
    ruta: '/api/municipio'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getMunicipio,
    crearMunicipio,
    actualizarMunicipio,
    borrarMunicipio,
    getMunicipioById
} = require('../controllers/municipio')

const router = Router();

router.get( '/', getMunicipio);

router.post( '/',
    [
        validarCampos
    ], 
    crearMunicipio 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarMunicipio
);

router.delete( '/:id',
    borrarMunicipio
);

router.get( '/:id',
    getMunicipioById
);

module.exports = router;

