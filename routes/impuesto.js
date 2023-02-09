/*
    Impuestos
    ruta: '/api/impuesto'
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getImpuesto,
    crearImpuesto,
    actualizarImpuesto,
    borrarImpuesto,
    getImpuestoById
} = require('../controllers/impuesto')

const router = Router();

router.get( '/', getImpuesto);

router.post( '/',
    [
        validarCampos
    ], 
    crearImpuesto 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarImpuesto
);

router.delete( '/:id',
    borrarImpuesto
);

router.get( '/:id',
    getImpuestoById
);

module.exports = router;

