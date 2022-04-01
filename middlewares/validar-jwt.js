require("dotenv").config();
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const validarJWT = async (req = request, res = response, next) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({ msg: "No hay token en la petición" });
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
		//leer el usuario que corresponde al uid
		const usuario = await Usuario.findById(uid);
		//si el usuario no existe
		if (!usuario) {
			return res
				.status(401)
				.json({ msg: "Token no valido -usuario no existe en BD" });
		}
		//Verificar si el uid tiene estado en true
		if (usuario.estado == false) {
			return res.status(401).json({ msg: "Token no valido -estado false" });
		}
		req.usuario = usuario;
	} catch (error) {
		console.log(error);
		return res.status(401).json({ msg: "Token no valido" });
	}

	next();
};

module.exports = {
	validarJWT,
};
