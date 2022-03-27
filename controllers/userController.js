const { response, request } = require("express");
const usuariosGet = (req, res) => {
	const query = req.query;

	res.status(200).json({ ok: true, msg: "Msg Get", query });
};
const usuariosPost = (req, res) => {
	const { nombre, edad } = req.body;
	res.status(201).json({ ok: true, msg: "Msg Post", nombre, edad });
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
