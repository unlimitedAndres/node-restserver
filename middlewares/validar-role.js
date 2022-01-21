const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {

        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });

    }

    const { role, nombre } = req.usuario;

    if(role !== 'ADMIN_ROLE'){

        return res.status(400).json({
            msg: `${ nombre } no tiene permiso para hacer esta accion`
        });
        
    }
    next();
};

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token primero'
            });
        }   

        if ( !roles.includes( req.usuario.role ) ){
            return res.status(401).json({
                msg: `Para ésta acción se requiere uno de estos roles: ${ roles.join(', ') }`
            })
        }

        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRole
};
