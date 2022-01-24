const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT(usuario.id);

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                role: 'USER_ROLE'
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, 
            token
        });
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
};

module.exports = {
    login,
    googleSignIn
};
