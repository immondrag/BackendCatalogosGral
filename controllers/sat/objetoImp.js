const { response } = require('express');

const ObjetoImp = require('../../models/medicos/catalogoCIE9');

const getObjetoImp = async(req, res = response) => {

    const catalogoCIE9s = await ObjetoImp.find();

    res.json({
        ok: true,
        catalogoCIE9s
    })
}

const getObjetoImpById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const catalogoCIE9 = await ObjetoImp.findById(id);
    
        res.json({
            ok: true,
            catalogoCIE9
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearObjetoImp = async (req, res = response) => {

    const uid = req.uid;
    const catalogoCIE9 = new ObjetoImp({
        usuario: uid,
        ...req.body
    });
    try {

        const catalogoCIE9DB = await catalogoCIE9.save();
        res.json({
            ok: true,
            catalogoCIE9: catalogoCIE9DB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarObjetoImp = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const catalogoCIE9 = await ObjetoImp.findById( id );

        if ( !catalogoCIE9 ) {
            return res.status(404).json({
                ok: true,
                msg: 'ObjetoImp no encontrado por id',
            });
        }

        const cambiosObjetoImp = {
            ...req.body,
            usuario: uid
        }

        const catalogoCIE9Actualizado = await ObjetoImp.findByIdAndUpdate( id, cambiosObjetoImp, { new: true } );


        res.json({
            ok: true,
            catalogoCIE9: catalogoCIE9Actualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarObjetoImp = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const catalogoCIE9 = await ObjetoImp.findById( id );

        if ( !catalogoCIE9 ) {
            return res.status(404).json({
                ok: true,
                msg: 'ObjetoImp no encontrado por id',
            });
        }

        await ObjetoImp.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'ObjetoImp borrado'
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
    getObjetoImp,
    crearObjetoImp,
    actualizarObjetoImp,
    borrarObjetoImp,
    getObjetoImpById
}
