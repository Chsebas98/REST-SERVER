const Usuario = require("../models/Usuario");
const Role = require("../models/Role");
const esRoleValido = async (rol = "") => {
	const existRol = await Role.findOne({ rol });
	if (!existRol) {
		throw new Error(`El rol ${rol} no está registrado en la base de datos`);
	}
};

const existeEmail = async (correo = "") => {
	//verificar si existe
	const existe = await Usuario.findOne({ correo });
	if (existe) {
		throw new Error(`El correo ${correo} ya está registrado`);
	}
};

const existeUsuarioById = async (id) => {
	//verificar si el id existe
	const existeUsuario = await Usuario.findById(id);
	if (!existeUsuario) {
		throw new Error(`El id no existe ${id}`);
	}
};

module.exports = { esRoleValido, existeEmail, existeUsuarioById };
