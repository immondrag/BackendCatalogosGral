const { response } = require('express');

const CatalogoCIE10 = require('../../models/medicos/catalogoCIE10');

const getCatalogoCIE10 = async(req, res = response) => {

    const catalogoCIE10s = await CatalogoCIE10.find();

    res.json({
        ok: true,
        catalogoCIE10s
    })
}

const getCatalogoCIE10ById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const catalogoCIE10 = await CatalogoCIE10.findById(id);
    
        res.json({
            ok: true,
            catalogoCIE10
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearCatalogoCIE10 = async (req, res = response) => {

    const uid = req.uid;
    const catalogoCIE10 = new CatalogoCIE10({
        usuario: uid,
        ...req.body
    });
    try {

        const catalogoCIE10DB = await catalogoCIE10.save();
        res.json({
            ok: true,
            catalogoCIE10: catalogoCIE10DB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarCatalogoCIE10 = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const catalogoCIE10 = await CatalogoCIE10.findById( id );

        if ( !catalogoCIE10 ) {
            return res.status(404).json({
                ok: true,
                msg: 'CatalogoCIE10 no encontrado por id',
            });
        }

        const cambiosCatalogoCIE10 = {
            ...req.body,
            usuario: uid
        }

        const catalogoCIE10Actualizado = await CatalogoCIE10.findByIdAndUpdate( id, cambiosCatalogoCIE10, { new: true } );


        res.json({
            ok: true,
            catalogoCIE10: catalogoCIE10Actualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarCatalogoCIE10 = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const catalogoCIE10 = await CatalogoCIE10.findById( id );

        if ( !catalogoCIE10 ) {
            return res.status(404).json({
                ok: true,
                msg: 'CatalogoCIE10 no encontrado por id',
            });
        }

        await CatalogoCIE10.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'CatalogoCIE10 borrado'
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
    getCatalogoCIE10,
    crearCatalogoCIE10,
    actualizarCatalogoCIE10,
    borrarCatalogoCIE10,
    getCatalogoCIE10ById
}
