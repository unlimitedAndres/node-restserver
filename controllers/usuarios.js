const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { PromiseProvider } = require('mongoose');


const usuariosGet = async(req = request, res = response) => {
    // const { id, nombre = null, apikey } = req.query;
    const { limite = 5 , desde = 0} = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(  Number( desde ) )
    //     .limit( Number( limite ) )

    // const total = await Usuario.countDocuments(query);

    // const resp = await Promise.all([
    //     Usuario.countDocuments(query),
    //     Usuario.find(query)
    //         .skip(  Number( desde ) )
    //         .limit( Number( limite ) )
    // ])

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(  Number( desde ) )
            .limit( Number( limite ) )
    ])

    res.json({
        total,
        usuarios
    });
};

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    if( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }    

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);    
};    

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controler'
    });
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrado fisico de la base de datos
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};
