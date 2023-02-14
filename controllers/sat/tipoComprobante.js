const { response } = require('express');

const TipoComprobante = require('../../models/sat/tipoComprobante');

const getTipoComprobante = async(req, res = response) => {

    const tipoComprobantes = await TipoComprobante.find();

    res.json({
        ok: true,
        tipoComprobantes
    })
}

const getTipoComprobanteById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const tipoComprobante = await TipoComprobante.findById(id);
    
        res.json({
            ok: true,
            tipoComprobante
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearTipoComprobante = async (req, res = response) => {

    const uid = req.uid;
    const tipoComprobante = new TipoComprobante({
        usuario: uid,
        ...req.body
    });
    try {

        const tipoComprobanteDB = await tipoComprobante.save();
        res.json({
            ok: true,
            tipoComprobante: tipoComprobanteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarTipoComprobante = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const tipoComprobante = await TipoComprobante.findById( id );

        if ( !tipoComprobante ) {
            return res.status(404).json({
                ok: true,
                msg: 'TipoComprobante no encontrado por id',
            });
        }

        const cambiosTipoComprobante = {
            ...req.body,
            usuario: uid
        }

        const tipoComprobanteActualizado = await TipoComprobante.findByIdAndUpdate( id, cambiosTipoComprobante, { new: true } );


        res.json({
            ok: true,
            tipoComprobante: tipoComprobanteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarTipoComprobante = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const tipoComprobante = await TipoComprobante.findById( id );

        if ( !tipoComprobante ) {
            return res.status(404).json({
                ok: true,
                msg: 'TipoComprobante no encontrado por id',
            });
        }

        await TipoComprobante.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'TipoComprobante borrado'
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
    getTipoComprobante,
    crearTipoComprobante,
    actualizarTipoComprobante,
    borrarTipoComprobante,
    getTipoComprobanteById
}
