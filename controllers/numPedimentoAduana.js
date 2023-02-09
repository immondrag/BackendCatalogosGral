const { response } = require('express');

const NumPedimentoAduana = require('../models/numPedimentoAduana');

const getNumPedimentoAduana = async(req, res = response) => {

    const numPedimentoAduanas = await NumPedimentoAduana.find();

    res.json({
        ok: true,
        numPedimentoAduanas
    })
}

const getNumPedimentoAduanaById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const numPedimentoAduana = await NumPedimentoAduana.findById(id);
    
        res.json({
            ok: true,
            numPedimentoAduana
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearNumPedimentoAduana = async (req, res = response) => {

    const uid = req.uid;
    const numPedimentoAduana = new NumPedimentoAduana({
        usuario: uid,
        ...req.body
    });
    try {

        const numPedimentoAduanaDB = await numPedimentoAduana.save();
        res.json({
            ok: true,
            numPedimentoAduana: numPedimentoAduanaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarNumPedimentoAduana = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const numPedimentoAduana = await NumPedimentoAduana.findById( id );

        if ( !numPedimentoAduana ) {
            return res.status(404).json({
                ok: true,
                msg: 'NumPedimentoAduana no encontrado por id',
            });
        }

        const cambiosNumPedimentoAduana = {
            ...req.body,
            usuario: uid
        }

        const numPedimentoAduanaActualizado = await NumPedimentoAduana.findByIdAndUpdate( id, cambiosNumPedimentoAduana, { new: true } );


        res.json({
            ok: true,
            numPedimentoAduana: numPedimentoAduanaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarNumPedimentoAduana = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const numPedimentoAduana = await NumPedimentoAduana.findById( id );

        if ( !numPedimentoAduana ) {
            return res.status(404).json({
                ok: true,
                msg: 'NumPedimentoAduana no encontrado por id',
            });
        }

        await NumPedimentoAduana.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'NumPedimentoAduana borrado'
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
    getNumPedimentoAduana,
    crearNumPedimentoAduana,
    actualizarNumPedimentoAduana,
    borrarNumPedimentoAduana,
    getNumPedimentoAduanaById
}
