/*
    RegimenFiscals
    ruta: '/api/regimenFiscal'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getRegimenFiscal,
    crearRegimenFiscal,
    actualizarRegimenFiscal,
    borrarRegimenFiscal,
    getRegimenFiscalById
} = require('../../controllers/sat/regimenFiscal')

const router = Router();

router.get( '/', getRegimenFiscal);

router.post( '/',
    [
        validarCampos
    ], 
    crearRegimenFiscal 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarRegimenFiscal
);

router.delete( '/:id',
    borrarRegimenFiscal
);

router.get( '/:id',
    getRegimenFiscalById
);

module.exports = router;

