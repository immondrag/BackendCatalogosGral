const { response } = require('express');

const TipoRelacion = require('../../models/sat/tipoRelacion');

const getTipoRelacion = async(req, res = response) => {

    const tipoRelacions = await TipoRelacion.find();

    res.json({
        ok: true,
        tipoRelacions
    })
}

const getTipoRelacionById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const tipoRelacion = await TipoRelacion.findById(id);
    
        res.json({
            ok: true,
            tipoRelacion
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearTipoRelacion = async (req, res = response) => {

    const uid = req.uid;
    const tipoRelacion = new TipoRelacion({
        usuario: uid,
        ...req.body
    });
    try {

        const tipoRelacionDB = await tipoRelacion.save();
        res.json({
            ok: true,
            tipoRelacion: tipoRelacionDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarTipoRelacion = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const tipoRelacion = await TipoRelacion.findById( id );

        if ( !tipoRelacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'TipoRelacion no encontrado por id',
            });
        }

        const cambiosTipoRelacion = {
            ...req.body,
            usuario: uid
        }

        const tipoRelacionActualizado = await TipoRelacion.findByIdAndUpdate( id, cambiosTipoRelacion, { new: true } );


        res.json({
            ok: true,
            tipoRelacion: tipoRelacionActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarTipoRelacion = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const tipoRelacion = await TipoRelacion.findById( id );

        if ( !tipoRelacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'TipoRelacion no encontrado por id',
            });
        }

        await TipoRelacion.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'TipoRelacion borrado'
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
    getTipoRelacion,
    crearTipoRelacion,
    actualizarTipoRelacion,
    borrarTipoRelacion,
    getTipoRelacionById
}
