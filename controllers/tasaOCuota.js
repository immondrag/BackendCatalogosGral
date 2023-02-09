const { response } = require('express');

const TasaOCuota = require('../models/tasaOCuota');

const getTasaOCuota = async(req, res = response) => {

    const tasaOCuotas = await TasaOCuota.find();

    res.json({
        ok: true,
        tasaOCuotas
    })
}

const getTasaOCuotaById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const tasaOCuota = await TasaOCuota.findById(id);
    
        res.json({
            ok: true,
            tasaOCuota
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearTasaOCuota = async (req, res = response) => {

    const uid = req.uid;
    const tasaOCuota = new TasaOCuota({
        usuario: uid,
        ...req.body
    });
    try {

        const tasaOCuotaDB = await tasaOCuota.save();
        res.json({
            ok: true,
            tasaOCuota: tasaOCuotaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarTasaOCuota = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const tasaOCuota = await TasaOCuota.findById( id );

        if ( !tasaOCuota ) {
            return res.status(404).json({
                ok: true,
                msg: 'TasaOCuota no encontrado por id',
            });
        }

        const cambiosTasaOCuota = {
            ...req.body,
            usuario: uid
        }

        const tasaOCuotaActualizado = await TasaOCuota.findByIdAndUpdate( id, cambiosTasaOCuota, { new: true } );


        res.json({
            ok: true,
            tasaOCuota: tasaOCuotaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarTasaOCuota = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const tasaOCuota = await TasaOCuota.findById( id );

        if ( !tasaOCuota ) {
            return res.status(404).json({
                ok: true,
                msg: 'TasaOCuota no encontrado por id',
            });
        }

        await TasaOCuota.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'TasaOCuota borrado'
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
    getTasaOCuota,
    crearTasaOCuota,
    actualizarTasaOCuota,
    borrarTasaOCuota,
    getTasaOCuotaById
}
