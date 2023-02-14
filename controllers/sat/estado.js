const { response } = require('express');

const Estado = require('../../models/sat/estado');

const getEstado = async(req, res = response) => {

    const estados = await Estado.find();

    res.json({
        ok: true,
        estados
    })
}

const getEstadoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const estado = await Estado.findById(id);
    
        res.json({
            ok: true,
            estado
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearEstado = async (req, res = response) => {

    const uid = req.uid;
    const estado = new Estado({
        usuario: uid,
        ...req.body
    });
    try {

        const estadoDB = await estado.save();
        res.json({
            ok: true,
            estado: estadoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarEstado = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const estado = await Estado.findById( id );

        if ( !estado ) {
            return res.status(404).json({
                ok: true,
                msg: 'Estado no encontrado por id',
            });
        }

        const cambiosEstado = {
            ...req.body,
            usuario: uid
        }

        const estadoActualizado = await Estado.findByIdAndUpdate( id, cambiosEstado, { new: true } );


        res.json({
            ok: true,
            estado: estadoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarEstado = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const estado = await Estado.findById( id );

        if ( !estado ) {
            return res.status(404).json({
                ok: true,
                msg: 'Estado no encontrado por id',
            });
        }

        await Estado.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Estado borrado'
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
    getEstado,
    crearEstado,
    actualizarEstado,
    borrarEstado,
    getEstadoById
}
