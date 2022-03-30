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

module.exports = { esRoleValido, existeEmail };
