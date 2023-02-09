const { response } = require('express');

const UsoCFDI = require('../models/usoCFDI');

const getUsoCFDI = async(req, res = response) => {

    const usoCFDIs = await UsoCFDI.find();

    res.json({
        ok: true,
        usoCFDIs
    })
}

const getUsoCFDIById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const usoCFDI = await UsoCFDI.findById(id);
    
        res.json({
            ok: true,
            usoCFDI
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearUsoCFDI = async (req, res = response) => {

    const uid = req.uid;
    const usoCFDI = new UsoCFDI({
        usuario: uid,
        ...req.body
    });
    try {

        const usoCFDIDB = await usoCFDI.save();
        res.json({
            ok: true,
            usoCFDI: usoCFDIDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarUsoCFDI = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const usoCFDI = await UsoCFDI.findById( id );

        if ( !usoCFDI ) {
            return res.status(404).json({
                ok: true,
                msg: 'UsoCFDI no encontrado por id',
            });
        }

        const cambiosUsoCFDI = {
            ...req.body,
            usuario: uid
        }

        const usoCFDIActualizado = await UsoCFDI.findByIdAndUpdate( id, cambiosUsoCFDI, { new: true } );


        res.json({
            ok: true,
            usoCFDI: usoCFDIActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarUsoCFDI = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const usoCFDI = await UsoCFDI.findById( id );

        if ( !usoCFDI ) {
            return res.status(404).json({
                ok: true,
                msg: 'UsoCFDI no encontrado por id',
            });
        }

        await UsoCFDI.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'UsoCFDI borrado'
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
    getUsoCFDI,
    crearUsoCFDI,
    actualizarUsoCFDI,
    borrarUsoCFDI,
    getUsoCFDIById
}
