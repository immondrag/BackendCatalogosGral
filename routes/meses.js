/*
    Mesess
    ruta: '/api/meses'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getMeses,
    crearMeses,
    actualizarMeses,
    borrarMeses,
    getMesesById
} = require('../controllers/meses')

const router = Router();

router.get( '/', getMeses);

router.post( '/',
    [
        validarCampos
    ], 
    crearMeses 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarMeses
);

router.delete( '/:id',
    borrarMeses
);

router.get( '/:id',
    getMesesById
);

module.exports = router;

