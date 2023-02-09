const { response } = require('express');

const Exportacion = require('../models/exportacion');

const getExportacion = async(req, res = response) => {

    const exportacions = await Exportacion.find();

    res.json({
        ok: true,
        exportacions
    })
}

const getExportacionById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const exportacion = await Exportacion.findById(id);
    
        res.json({
            ok: true,
            exportacion
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearExportacion = async (req, res = response) => {

    const uid = req.uid;
    const exportacion = new Exportacion({
        usuario: uid,
        ...req.body
    });
    try {

        const exportacionDB = await exportacion.save();
        res.json({
            ok: true,
            exportacion: exportacionDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarExportacion = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const exportacion = await Exportacion.findById( id );

        if ( !exportacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Exportacion no encontrado por id',
            });
        }

        const cambiosExportacion = {
            ...req.body,
            usuario: uid
        }

        const exportacionActualizado = await Exportacion.findByIdAndUpdate( id, cambiosExportacion, { new: true } );


        res.json({
            ok: true,
            exportacion: exportacionActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarExportacion = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const exportacion = await Exportacion.findById( id );

        if ( !exportacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Exportacion no encontrado por id',
            });
        }

        await Exportacion.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Exportacion borrado'
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
    getExportacion,
    crearExportacion,
    actualizarExportacion,
    borrarExportacion,
    getExportacionById
}
