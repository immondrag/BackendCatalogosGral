const { response } = require('express');

const CodigoPostal = require('../../models/sat/codigoPostal');

const getCodigoPostal = async(req, res = response) => {

    const codigoPostals = await CodigoPostal.find();

    res.json({
        ok: true,
        codigoPostals
    })
}

const getCodigoPostalById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const codigoPostal = await CodigoPostal.findById(id);
    
        res.json({
            ok: true,
            codigoPostal
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearCodigoPostal = async (req, res = response) => {

    const uid = req.uid;
    const codigoPostal = new CodigoPostal({
        usuario: uid,
        ...req.body
    });
    try {

        const codigoPostalDB = await codigoPostal.save();
        res.json({
            ok: true,
            codigoPostal: codigoPostalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarCodigoPostal = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const codigoPostal = await CodigoPostal.findById( id );

        if ( !codigoPostal ) {
            return res.status(404).json({
                ok: true,
                msg: 'CodigoPostal no encontrado por id',
            });
        }

        const cambiosCodigoPostal = {
            ...req.body,
            usuario: uid
        }

        const codigoPostalActualizado = await CodigoPostal.findByIdAndUpdate( id, cambiosCodigoPostal, { new: true } );


        res.json({
            ok: true,
            codigoPostal: codigoPostalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarCodigoPostal = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const codigoPostal = await CodigoPostal.findById( id );

        if ( !codigoPostal ) {
            return res.status(404).json({
                ok: true,
                msg: 'CodigoPostal no encontrado por id',
            });
        }

        await CodigoPostal.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'CodigoPostal borrado'
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
    getCodigoPostal,
    crearCodigoPostal,
    actualizarCodigoPostal,
    borrarCodigoPostal,
    getCodigoPostalById
}
