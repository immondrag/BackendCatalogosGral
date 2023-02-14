const { response } = require('express');

const Aduana = require('../../models/sat/aduana');

const getAduana = async(req, res = response) => {

    const aduanas = await Aduana.find();

    res.json({
        ok: true,
        aduanas
    })
}

const getAduanaById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const aduana = await Aduana.findById(id);
    
        res.json({
            ok: true,
            aduana
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearAduana = async (req, res = response) => {

    const uid = req.uid;
    const aduana = new Aduana({
        usuario: uid,
        ...req.body
    });
    try {

        const aduanaDB = await aduana.save();
        res.json({
            ok: true,
            aduana: aduanaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarAduana = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const aduana = await Aduana.findById( id );

        if ( !aduana ) {
            return res.status(404).json({
                ok: true,
                msg: 'Aduana no encontrado por id',
            });
        }

        const cambiosAduana = {
            ...req.body,
            usuario: uid
        }

        const aduanaActualizado = await Aduana.findByIdAndUpdate( id, cambiosAduana, { new: true } );


        res.json({
            ok: true,
            aduana: aduanaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarAduana = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const aduana = await Aduana.findById( id );

        if ( !aduana ) {
            return res.status(404).json({
                ok: true,
                msg: 'Aduana no encontrado por id',
            });
        }

        await Aduana.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Aduana borrado'
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
    getAduana,
    crearAduana,
    actualizarAduana,
    borrarAduana,
    getAduanaById
}
