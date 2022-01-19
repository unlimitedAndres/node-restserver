const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
};

const existeEmail = async (correo = '') => {
    const emailExiste = await Usuario.findOne({ correo });
    if (emailExiste) {
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
};

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe un usuario con el id ${id}`);
    }
};

module.exports = { esRoleValido, existeEmail, existeUsuarioPorId };
