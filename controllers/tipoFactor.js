const { response } = require('express');

const TipoFactor = require('../models/tipoFactor');

const getTipoFactor = async(req, res = response) => {

    const tipoFactors = await TipoFactor.find();

    res.json({
        ok: true,
        tipoFactors
    })
}

const getTipoFactorById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const tipoFactor = await TipoFactor.findById(id);
    
        res.json({
            ok: true,
            tipoFactor
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearTipoFactor = async (req, res = response) => {

    const uid = req.uid;
    const tipoFactor = new TipoFactor({
        usuario: uid,
        ...req.body
    });
    try {

        const tipoFactorDB = await tipoFactor.save();
        res.json({
            ok: true,
            tipoFactor: tipoFactorDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarTipoFactor = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const tipoFactor = await TipoFactor.findById( id );

        if ( !tipoFactor ) {
            return res.status(404).json({
                ok: true,
                msg: 'TipoFactor no encontrado por id',
            });
        }

        const cambiosTipoFactor = {
            ...req.body,
            usuario: uid
        }

        const tipoFactorActualizado = await TipoFactor.findByIdAndUpdate( id, cambiosTipoFactor, { new: true } );


        res.json({
            ok: true,
            tipoFactor: tipoFactorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarTipoFactor = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const tipoFactor = await TipoFactor.findById( id );

        if ( !tipoFactor ) {
            return res.status(404).json({
                ok: true,
                msg: 'TipoFactor no encontrado por id',
            });
        }

        await TipoFactor.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'TipoFactor borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



module.exports = {
    getTipoFactor,
    crearTipoFactor,
    actualizarTipoFactor,
    borrarTipoFactor,
    getTipoFactorById
}
