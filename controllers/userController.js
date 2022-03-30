const { response, request } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const usuariosGet = (req, res) => {
	const query = req.query;

	res.status(200).json({ ok: true, msg: "Msg Get", query });
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
const usuariosPut = (req, res) => {
	const { id } = req.params;
	res.status(400).json({ ok: true, msg: "Msg Put", id });
};
const usuariosDelete = (req, res) => {
	res.status(403).json({ ok: true, msg: "Msg Delete" });
};
module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
