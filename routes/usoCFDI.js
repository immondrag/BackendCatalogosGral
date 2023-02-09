/*
    UsoCFDIs
    ruta: '/api/usoCFDI'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getUsoCFDI,
    crearUsoCFDI,
    actualizarUsoCFDI,
    borrarUsoCFDI,
    getUsoCFDIById
} = require('../controllers/usoCFDI')

const router = Router();

router.get( '/', getUsoCFDI);

router.post( '/',
    [
        validarCampos
    ], 
    crearUsoCFDI 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarUsoCFDI
);

router.delete( '/:id',
    borrarUsoCFDI
);

router.get( '/:id',
    getUsoCFDIById
);

module.exports = router;

