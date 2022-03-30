const { response, request } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const usuariosGet = async (req, res) => {
	/* const query = req.query; */
	const { limite = 5, desde = 0 } = req.query;
	/* 	const usuarios = await Usuario.find({ estado: true })
		.skip(Number(desde))
		.limit(Number(limite));
	const total = await Usuario.countDocuments({ estado: true });
 */
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments({ estado: true }),
		Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
	]);
	res.status(200).json({ total, usuarios });
};
const usuariosPost = async (req, res = response) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	//Encriptado del paswword
	const salt = bcrypt.genSaltSync();
	usuario.password = bcrypt.hashSync(password, salt);
	//Guardar en bd
	await usuario.save();
	//console.log(usuario);
	res.json({ usuario });
};
const usuariosPut = async (req, res) => {
	const { id } = req.params;
	const { password, google, correo, _id, ...resto } = req.body;

	//TODO validar contra BD
	if (password) {
		//Encriptado del paswword
		const salt = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(password, salt);
	}
	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.status(400).json({ usuario });
};
const usuariosDelete = async (req, res) => {
	const { id } = req.params;
	//fisicamente borrado
	//const usuario = await Usuario.findByIdAndDelete(id);
	//cambiando estado

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.status(403).json({ usuario });
};
module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
