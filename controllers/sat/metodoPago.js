const { response } = require('express');

const MetodoPago = require('../../models/sat/metodoPago');

const getMetodoPago = async(req, res = response) => {

    const metodoPagos = await MetodoPago.find();

    res.json({
        ok: true,
        metodoPagos
    })
}

const getMetodoPagoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const metodoPago = await MetodoPago.findById(id);
    
        res.json({
            ok: true,
            metodoPago
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMetodoPago = async (req, res = response) => {

    const uid = req.uid;
    const metodoPago = new MetodoPago({
        usuario: uid,
        ...req.body
    });
    try {

        const metodoPagoDB = await metodoPago.save();
        res.json({
            ok: true,
            metodoPago: metodoPagoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMetodoPago = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const metodoPago = await MetodoPago.findById( id );

        if ( !metodoPago ) {
            return res.status(404).json({
                ok: true,
                msg: 'MetodoPago no encontrado por id',
            });
        }

        const cambiosMetodoPago = {
            ...req.body,
            usuario: uid
        }

        const metodoPagoActualizado = await MetodoPago.findByIdAndUpdate( id, cambiosMetodoPago, { new: true } );


        res.json({
            ok: true,
            metodoPago: metodoPagoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMetodoPago = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const metodoPago = await MetodoPago.findById( id );

        if ( !metodoPago ) {
            return res.status(404).json({
                ok: true,
                msg: 'MetodoPago no encontrado por id',
            });
        }

        await MetodoPago.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'MetodoPago borrado'
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
    getMetodoPago,
    crearMetodoPago,
    actualizarMetodoPago,
    borrarMetodoPago,
    getMetodoPagoById
}
