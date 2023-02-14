/*
    ObjetoImps
    ruta: '/api/objetoImp'
*/
const { Router } = require('express');
const { validarCampos } = require('../../middlewares/validar-campos');

const {
    getObjetoImp,
    crearObjetoImp,
    actualizarObjetoImp,
    borrarObjetoImp,
    getObjetoImpById
} = require('../../controllers/sat/objetoImp')

const router = Router();

router.get( '/', getObjetoImp);

router.post( '/',
    [
        validarCampos
    ], 
    crearObjetoImp 
);

router.put( '/:id',
    [
        validarCampos
    ],
    actualizarObjetoImp
);

router.delete( '/:id',
    borrarObjetoImp
);

router.get( '/:id',
    getObjetoImpById
);

module.exports = router;

