const { response } = require('express');

const Pais = require('../models/pais');

const getPais = async(req, res = response) => {

    const paiss = await Pais.find();

    res.json({
        ok: true,
        paiss
    })
}

const getPaisById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const pais = await Pais.findById(id);
    
        res.json({
            ok: true,
            pais
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearPais = async (req, res = response) => {

    const uid = req.uid;
    const pais = new Pais({
        usuario: uid,
        ...req.body
    });
    try {

        const paisDB = await pais.save();
        res.json({
            ok: true,
            pais: paisDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarPais = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const pais = await Pais.findById( id );

        if ( !pais ) {
            return res.status(404).json({
                ok: true,
                msg: 'Pais no encontrado por id',
            });
        }

        const cambiosPais = {
            ...req.body,
            usuario: uid
        }

        const paisActualizado = await Pais.findByIdAndUpdate( id, cambiosPais, { new: true } );


        res.json({
            ok: true,
            pais: paisActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarPais = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const pais = await Pais.findById( id );

        if ( !pais ) {
            return res.status(404).json({
                ok: true,
                msg: 'Pais no encontrado por id',
            });
        }

        await Pais.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Pais borrado'
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
    getPais,
    crearPais,
    actualizarPais,
    borrarPais,
    getPaisById
}
