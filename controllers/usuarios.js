const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
    const { id, nombre = null, apikey } = req.query;

    res.json({
        msg: "get API - Controlador",
        id,
        nombre,
        apikey
    });
};

const usuariosPut = (req, res = response) => {
    const { ctm } = req.params;

    res.json({
        msg: "put API - Controler",
        ctm
    });
};

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: "post API - Controler",
        nombre,
        edad
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controler"
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - Controler"
    });
};

module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};
