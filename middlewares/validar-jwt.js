const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('totoken');

    if ( !token ) {

        return res.status(401).json({

            msg: 'Unauthorized method'

        });

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById( uid );

        if( !usuario || !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({

            msg: 'Token invalido'

        });

    }

};

module.exports = { validarJWT };