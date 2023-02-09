const { response } = require('express');

const Municipio = require('../models/municipio');

const getMunicipio = async(req, res = response) => {

    const municipios = await Municipio.find();

    res.json({
        ok: true,
        municipios
    })
}

const getMunicipioById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const municipio = await Municipio.findById(id);
    
        res.json({
            ok: true,
            municipio
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMunicipio = async (req, res = response) => {

    const uid = req.uid;
    const municipio = new Municipio({
        usuario: uid,
        ...req.body
    });
    try {

        const municipioDB = await municipio.save();
        res.json({
            ok: true,
            municipio: municipioDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMunicipio = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const municipio = await Municipio.findById( id );

        if ( !municipio ) {
            return res.status(404).json({
                ok: true,
                msg: 'Municipio no encontrado por id',
            });
        }

        const cambiosMunicipio = {
            ...req.body,
            usuario: uid
        }

        const municipioActualizado = await Municipio.findByIdAndUpdate( id, cambiosMunicipio, { new: true } );


        res.json({
            ok: true,
            municipio: municipioActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMunicipio = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const municipio = await Municipio.findById( id );

        if ( !municipio ) {
            return res.status(404).json({
                ok: true,
                msg: 'Municipio no encontrado por id',
            });
        }

        await Municipio.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Municipio borrado'
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
    getMunicipio,
    crearMunicipio,
    actualizarMunicipio,
    borrarMunicipio,
    getMunicipioById
}
