require("dotenv").config();
const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/opciones_jwt");
const Login = async (req, res = response) => {
	const { correo, password } = req.body;
	try {
		//verificar si el email existe
		const usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			return res
				.status(400)
				.json({ msg: "Usuario o contraseña no son correctos -correo" });
		}
		//usuario activo
		if (usuario.estado == false) {
			return res
				.status(400)
				.json({ msg: "Usuario o contraseña no son correctos -estado:false" });
		}
		//password verify
		const validPassword = bcrypt.compareSync(password, usuario.password);
		console.log(validPassword);
		if (validPassword == false) {
			return res
				.status(400)
				.json({ msg: "Usuario o contraseña no son correctos -password" });
		}
		//generar token
		const token = await generarJWT(usuario.id);

		res.json({ usuario, token });
	} catch (error) {
		return res.status(500).json({ mgs: "Hable con el administrador" });
	}
};

module.exports = { Login };
