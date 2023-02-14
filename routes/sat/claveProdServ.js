/*
    ClaveProdServs
    ruta: '/api/claveProdServ'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getClaveProdServ,
    crearClaveProdServ,
    actualizarClaveProdServ,
    borrarClaveProdServ,
    getClaveProdServById
} = require('../../controllers/sat/claveProdServ')

const router = Router();

router.get( '/', getClaveProdServ);

router.post( '/',
    [
        validarCampos
    ], 
    crearClaveProdServ 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarClaveProdServ
);

router.delete( '/:id',
    borrarClaveProdServ
);

router.get( '/:id',
    getClaveProdServById
);

module.exports = router;

