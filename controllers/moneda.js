const { response } = require('express');

const Moneda = require('../models/moneda');

const getMoneda = async(req, res = response) => {

    const monedas = await Moneda.find();

    res.json({
        ok: true,
        monedas
    })
}

const getMonedaById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const moneda = await Moneda.findById(id);
    
        res.json({
            ok: true,
            moneda
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMoneda = async (req, res = response) => {

    const uid = req.uid;
    const moneda = new Moneda({
        usuario: uid,
        ...req.body
    });
    try {

        const monedaDB = await moneda.save();
        res.json({
            ok: true,
            moneda: monedaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMoneda = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const moneda = await Moneda.findById( id );

        if ( !moneda ) {
            return res.status(404).json({
                ok: true,
                msg: 'Moneda no encontrado por id',
            });
        }

        const cambiosMoneda = {
            ...req.body,
            usuario: uid
        }

        const monedaActualizado = await Moneda.findByIdAndUpdate( id, cambiosMoneda, { new: true } );


        res.json({
            ok: true,
            moneda: monedaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMoneda = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const moneda = await Moneda.findById( id );

        if ( !moneda ) {
            return res.status(404).json({
                ok: true,
                msg: 'Moneda no encontrado por id',
            });
        }

        await Moneda.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Moneda borrado'
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
    getMoneda,
    crearMoneda,
    actualizarMoneda,
    borrarMoneda,
    getMonedaById
}
