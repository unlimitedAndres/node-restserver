const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {

        // Verificar existencia del usuario
        const usuario = await Usuario.findOne({
            correo,
            estado: true
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });
        }

        // validacion de la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Consulte con el administrador'
        });
    }
};

module.exports = {
    login
};
