const { response } = require('express');

const CatalogoCIE9 = require('../../models/medicos/catalogoCIE9');

const getCatalogoCIE9 = async(req, res = response) => {

    const catalogoCIE9s = await CatalogoCIE9.find();

    res.json({
        ok: true,
        catalogoCIE9s
    })
}

const getCatalogoCIE9ById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const catalogoCIE9 = await CatalogoCIE9.findById(id);
    
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

const crearCatalogoCIE9 = async (req, res = response) => {

    const uid = req.uid;
    const catalogoCIE9 = new CatalogoCIE9({
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

const actualizarCatalogoCIE9 = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const catalogoCIE9 = await CatalogoCIE9.findById( id );

        if ( !catalogoCIE9 ) {
            return res.status(404).json({
                ok: true,
                msg: 'CatalogoCIE9 no encontrado por id',
            });
        }

        const cambiosCatalogoCIE9 = {
            ...req.body,
            usuario: uid
        }

        const catalogoCIE9Actualizado = await CatalogoCIE9.findByIdAndUpdate( id, cambiosCatalogoCIE9, { new: true } );


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

const borrarCatalogoCIE9 = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const catalogoCIE9 = await CatalogoCIE9.findById( id );

        if ( !catalogoCIE9 ) {
            return res.status(404).json({
                ok: true,
                msg: 'CatalogoCIE9 no encontrado por id',
            });
        }

        await CatalogoCIE9.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'CatalogoCIE9 borrado'
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
    getCatalogoCIE9,
    crearCatalogoCIE9,
    actualizarCatalogoCIE9,
    borrarCatalogoCIE9,
    getCatalogoCIE9ById
}
