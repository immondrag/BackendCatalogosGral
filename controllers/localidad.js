const { response } = require('express');

const Localidad = require('../models/localidad');

const getLocalidad = async(req, res = response) => {

    const localidads = await Localidad.find();

    res.json({
        ok: true,
        localidads
    })
}

const getLocalidadById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const localidad = await Localidad.findById(id);
    
        res.json({
            ok: true,
            localidad
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearLocalidad = async (req, res = response) => {

    const uid = req.uid;
    const localidad = new Localidad({
        usuario: uid,
        ...req.body
    });
    try {

        const localidadDB = await localidad.save();
        res.json({
            ok: true,
            localidad: localidadDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarLocalidad = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const localidad = await Localidad.findById( id );

        if ( !localidad ) {
            return res.status(404).json({
                ok: true,
                msg: 'Localidad no encontrado por id',
            });
        }

        const cambiosLocalidad = {
            ...req.body,
            usuario: uid
        }

        const localidadActualizado = await Localidad.findByIdAndUpdate( id, cambiosLocalidad, { new: true } );


        res.json({
            ok: true,
            localidad: localidadActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarLocalidad = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const localidad = await Localidad.findById( id );

        if ( !localidad ) {
            return res.status(404).json({
                ok: true,
                msg: 'Localidad no encontrado por id',
            });
        }

        await Localidad.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Localidad borrado'
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
    getLocalidad,
    crearLocalidad,
    actualizarLocalidad,
    borrarLocalidad,
    getLocalidadById
}
