/*
    PatenteAduanals
    ruta: '/api/patenteAduanal'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getPatenteAduanal,
    crearPatenteAduanal,
    actualizarPatenteAduanal,
    borrarPatenteAduanal,
    getPatenteAduanalById
} = require('../../controllers/sat/patenteAduanal')

const router = Router();

router.get( '/', getPatenteAduanal);

router.post( '/',
    [
        validarCampos
    ], 
    crearPatenteAduanal 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarPatenteAduanal
);

router.delete( '/:id',
    borrarPatenteAduanal
);

router.get( '/:id',
    getPatenteAduanalById
);

module.exports = router;

