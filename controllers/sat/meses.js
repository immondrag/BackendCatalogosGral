const { response } = require('express');

const Meses = require('../../models/sat/meses');

const getMeses = async(req, res = response) => {

    const mesess = await Meses.find();

    res.json({
        ok: true,
        mesess
    })
}

const getMesesById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const meses = await Meses.findById(id);
    
        res.json({
            ok: true,
            meses
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMeses = async (req, res = response) => {

    const uid = req.uid;
    const meses = new Meses({
        usuario: uid,
        ...req.body
    });
    try {

        const mesesDB = await meses.save();
        res.json({
            ok: true,
            meses: mesesDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMeses = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const meses = await Meses.findById( id );

        if ( !meses ) {
            return res.status(404).json({
                ok: true,
                msg: 'Meses no encontrado por id',
            });
        }

        const cambiosMeses = {
            ...req.body,
            usuario: uid
        }

        const mesesActualizado = await Meses.findByIdAndUpdate( id, cambiosMeses, { new: true } );


        res.json({
            ok: true,
            meses: mesesActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMeses = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const meses = await Meses.findById( id );

        if ( !meses ) {
            return res.status(404).json({
                ok: true,
                msg: 'Meses no encontrado por id',
            });
        }

        await Meses.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Meses borrado'
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
    getMeses,
    crearMeses,
    actualizarMeses,
    borrarMeses,
    getMesesById
}
