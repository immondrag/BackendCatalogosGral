const { response } = require('express');

const Impuesto = require('../models/impuesto');

const getImpuesto = async(req, res = response) => {

    const impuestos = await Impuesto.find();

    res.json({
        ok: true,
        impuestos
    })
}

const getImpuestoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const impuesto = await Impuesto.findById(id);
    
        res.json({
            ok: true,
            impuesto
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearImpuesto = async (req, res = response) => {

    const uid = req.uid;
    const impuesto = new Impuesto({
        usuario: uid,
        ...req.body
    });
    try {

        const impuestoDB = await impuesto.save();
        res.json({
            ok: true,
            impuesto: impuestoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarImpuesto = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const impuesto = await Impuesto.findById( id );

        if ( !impuesto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Impuesto no encontrado por id',
            });
        }

        const cambiosImpuesto = {
            ...req.body,
            usuario: uid
        }

        const impuestoActualizado = await Impuesto.findByIdAndUpdate( id, cambiosImpuesto, { new: true } );


        res.json({
            ok: true,
            impuesto: impuestoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarImpuesto = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const impuesto = await Impuesto.findById( id );

        if ( !impuesto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Impuesto no encontrado por id',
            });
        }

        await Impuesto.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Impuesto borrado'
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
    getImpuesto,
    crearImpuesto,
    actualizarImpuesto,
    borrarImpuesto,
    getImpuestoById
}
