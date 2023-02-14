const { response } = require('express');

const ClaveProdServ = require('../../models/sat/claveProdServ');

const getClaveProdServ = async(req, res = response) => {

    const claveProdServs = await ClaveProdServ.find();

    res.json({
        ok: true,
        claveProdServs
    })
}

const getClaveProdServById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const claveProdServ = await ClaveProdServ.findById(id);
    
        res.json({
            ok: true,
            claveProdServ
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearClaveProdServ = async (req, res = response) => {

    const uid = req.uid;
    const claveProdServ = new ClaveProdServ({
        usuario: uid,
        ...req.body
    });
    try {

        const claveProdServDB = await claveProdServ.save();
        res.json({
            ok: true,
            claveProdServ: claveProdServDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarClaveProdServ = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const claveProdServ = await ClaveProdServ.findById( id );

        if ( !claveProdServ ) {
            return res.status(404).json({
                ok: true,
                msg: 'ClaveProdServ no encontrado por id',
            });
        }

        const cambiosClaveProdServ = {
            ...req.body,
            usuario: uid
        }

        const claveProdServActualizado = await ClaveProdServ.findByIdAndUpdate( id, cambiosClaveProdServ, { new: true } );


        res.json({
            ok: true,
            claveProdServ: claveProdServActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarClaveProdServ = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const claveProdServ = await ClaveProdServ.findById( id );

        if ( !claveProdServ ) {
            return res.status(404).json({
                ok: true,
                msg: 'ClaveProdServ no encontrado por id',
            });
        }

        await ClaveProdServ.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'ClaveProdServ borrado'
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
    getClaveProdServ,
    crearClaveProdServ,
    actualizarClaveProdServ,
    borrarClaveProdServ,
    getClaveProdServById
}
