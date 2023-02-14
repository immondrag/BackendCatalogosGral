const { response } = require('express');

const PatenteAduanal = require('../../models/sat/patenteAduanal');

const getPatenteAduanal = async(req, res = response) => {

    const patenteAduanals = await PatenteAduanal.find();

    res.json({
        ok: true,
        patenteAduanals
    })
}

const getPatenteAduanalById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const patenteAduanal = await PatenteAduanal.findById(id);
    
        res.json({
            ok: true,
            patenteAduanal
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearPatenteAduanal = async (req, res = response) => {

    const uid = req.uid;
    const patenteAduanal = new PatenteAduanal({
        usuario: uid,
        ...req.body
    });
    try {

        const patenteAduanalDB = await patenteAduanal.save();
        res.json({
            ok: true,
            patenteAduanal: patenteAduanalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarPatenteAduanal = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const patenteAduanal = await PatenteAduanal.findById( id );

        if ( !patenteAduanal ) {
            return res.status(404).json({
                ok: true,
                msg: 'PatenteAduanal no encontrado por id',
            });
        }

        const cambiosPatenteAduanal = {
            ...req.body,
            usuario: uid
        }

        const patenteAduanalActualizado = await PatenteAduanal.findByIdAndUpdate( id, cambiosPatenteAduanal, { new: true } );


        res.json({
            ok: true,
            patenteAduanal: patenteAduanalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarPatenteAduanal = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const patenteAduanal = await PatenteAduanal.findById( id );

        if ( !patenteAduanal ) {
            return res.status(404).json({
                ok: true,
                msg: 'PatenteAduanal no encontrado por id',
            });
        }

        await PatenteAduanal.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'PatenteAduanal borrado'
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
    getPatenteAduanal,
    crearPatenteAduanal,
    actualizarPatenteAduanal,
    borrarPatenteAduanal,
    getPatenteAduanalById
}
