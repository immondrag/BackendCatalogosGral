const { response } = require('express');

const RegimenFiscal = require('../models/regimenFiscal');

const getRegimenFiscal = async(req, res = response) => {

    const regimenFiscals = await RegimenFiscal.find();

    res.json({
        ok: true,
        regimenFiscals
    })
}

const getRegimenFiscalById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const regimenFiscal = await RegimenFiscal.findById(id);
    
        res.json({
            ok: true,
            regimenFiscal
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearRegimenFiscal = async (req, res = response) => {

    const uid = req.uid;
    const regimenFiscal = new RegimenFiscal({
        usuario: uid,
        ...req.body
    });
    try {

        const regimenFiscalDB = await regimenFiscal.save();
        res.json({
            ok: true,
            regimenFiscal: regimenFiscalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarRegimenFiscal = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const regimenFiscal = await RegimenFiscal.findById( id );

        if ( !regimenFiscal ) {
            return res.status(404).json({
                ok: true,
                msg: 'RegimenFiscal no encontrado por id',
            });
        }

        const cambiosRegimenFiscal = {
            ...req.body,
            usuario: uid
        }

        const regimenFiscalActualizado = await RegimenFiscal.findByIdAndUpdate( id, cambiosRegimenFiscal, { new: true } );


        res.json({
            ok: true,
            regimenFiscal: regimenFiscalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarRegimenFiscal = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const regimenFiscal = await RegimenFiscal.findById( id );

        if ( !regimenFiscal ) {
            return res.status(404).json({
                ok: true,
                msg: 'RegimenFiscal no encontrado por id',
            });
        }

        await RegimenFiscal.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'RegimenFiscal borrado'
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
    getRegimenFiscal,
    crearRegimenFiscal,
    actualizarRegimenFiscal,
    borrarRegimenFiscal,
    getRegimenFiscalById
}
