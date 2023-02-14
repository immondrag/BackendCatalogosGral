/*
    TasaOCuotas
    ruta: '/api/tasaOCuota'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getTasaOCuota,
    crearTasaOCuota,
    actualizarTasaOCuota,
    borrarTasaOCuota,
    getTasaOCuotaById
} = require('../../controllers/sat/tasaOCuota')

const router = Router();

router.get( '/', getTasaOCuota);

router.post( '/',
    [
        validarCampos
    ], 
    crearTasaOCuota 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarTasaOCuota
);

router.delete( '/:id',
    borrarTasaOCuota
);

router.get( '/:id',
    getTasaOCuotaById
);

module.exports = router;

