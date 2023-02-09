const { response } = require('express');

const ClaveUnidad = require('../models/claveUnidad');

const getClaveUnidad = async(req, res = response) => {

    const claveUnidads = await ClaveUnidad.find();

    res.json({
        ok: true,
        claveUnidads
    })
}

const getClaveUnidadById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const claveUnidad = await ClaveUnidad.findById(id);
    
        res.json({
            ok: true,
            claveUnidad
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearClaveUnidad = async (req, res = response) => {

    const uid = req.uid;
    const claveUnidad = new ClaveUnidad({
        usuario: uid,
        ...req.body
    });
    try {

        const claveUnidadDB = await claveUnidad.save();
        res.json({
            ok: true,
            claveUnidad: claveUnidadDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarClaveUnidad = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const claveUnidad = await ClaveUnidad.findById( id );

        if ( !claveUnidad ) {
            return res.status(404).json({
                ok: true,
                msg: 'ClaveUnidad no encontrado por id',
            });
        }

        const cambiosClaveUnidad = {
            ...req.body,
            usuario: uid
        }

        const claveUnidadActualizado = await ClaveUnidad.findByIdAndUpdate( id, cambiosClaveUnidad, { new: true } );


        res.json({
            ok: true,
            claveUnidad: claveUnidadActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarClaveUnidad = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const claveUnidad = await ClaveUnidad.findById( id );

        if ( !claveUnidad ) {
            return res.status(404).json({
                ok: true,
                msg: 'ClaveUnidad no encontrado por id',
            });
        }

        await ClaveUnidad.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'ClaveUnidad borrado'
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
    getClaveUnidad,
    crearClaveUnidad,
    actualizarClaveUnidad,
    borrarClaveUnidad,
    getClaveUnidadById
}
