const { response } = require('express');

const Colonia = require('../../models/sat/colonia');

const getColonia = async(req, res = response) => {

    const colonias = await Colonia.find();

    res.json({
        ok: true,
        colonias
    })
}

const getColoniaById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const colonia = await Colonia.findById(id);
    
        res.json({
            ok: true,
            colonia
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearColonia = async (req, res = response) => {

    const uid = req.uid;
    const colonia = new Colonia({
        usuario: uid,
        ...req.body
    });
    try {

        const coloniaDB = await colonia.save();
        res.json({
            ok: true,
            colonia: coloniaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarColonia = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const colonia = await Colonia.findById( id );

        if ( !colonia ) {
            return res.status(404).json({
                ok: true,
                msg: 'Colonia no encontrado por id',
            });
        }

        const cambiosColonia = {
            ...req.body,
            usuario: uid
        }

        const coloniaActualizado = await Colonia.findByIdAndUpdate( id, cambiosColonia, { new: true } );


        res.json({
            ok: true,
            colonia: coloniaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarColonia = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const colonia = await Colonia.findById( id );

        if ( !colonia ) {
            return res.status(404).json({
                ok: true,
                msg: 'Colonia no encontrado por id',
            });
        }

        await Colonia.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Colonia borrado'
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
    getColonia,
    crearColonia,
    actualizarColonia,
    borrarColonia,
    getColoniaById
}
