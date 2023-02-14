const { response } = require('express');

const Periodicidad = require('../../models/sat/periodicidad');

const getPeriodicidad = async(req, res = response) => {

    const periodicidads = await Periodicidad.find();

    res.json({
        ok: true,
        periodicidads
    })
}

const getPeriodicidadById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const periodicidad = await Periodicidad.findById(id);
    
        res.json({
            ok: true,
            periodicidad
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearPeriodicidad = async (req, res = response) => {

    const uid = req.uid;
    const periodicidad = new Periodicidad({
        usuario: uid,
        ...req.body
    });
    try {

        const periodicidadDB = await periodicidad.save();
        res.json({
            ok: true,
            periodicidad: periodicidadDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarPeriodicidad = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const periodicidad = await Periodicidad.findById( id );

        if ( !periodicidad ) {
            return res.status(404).json({
                ok: true,
                msg: 'Periodicidad no encontrado por id',
            });
        }

        const cambiosPeriodicidad = {
            ...req.body,
            usuario: uid
        }

        const periodicidadActualizado = await Periodicidad.findByIdAndUpdate( id, cambiosPeriodicidad, { new: true } );


        res.json({
            ok: true,
            periodicidad: periodicidadActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarPeriodicidad = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const periodicidad = await Periodicidad.findById( id );

        if ( !periodicidad ) {
            return res.status(404).json({
                ok: true,
                msg: 'Periodicidad no encontrado por id',
            });
        }

        await Periodicidad.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Periodicidad borrado'
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
    getPeriodicidad,
    crearPeriodicidad,
    actualizarPeriodicidad,
    borrarPeriodicidad,
    getPeriodicidadById
}
