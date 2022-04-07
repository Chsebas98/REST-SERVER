require("dotenv").config();
const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/opciones_jwt");
const { googleVerify } = require("../helpers/google-verify");
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
const googleSignIn = async (req, res = response) => {
	const { id_token } = req.body;
	try {
		const { nombre, img, correo } = await googleVerify(id_token);
		//console.log(googleUser);
		let usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			//crear el usuario
			const data = {
				nombre,
				correo,
				password: "abc123",
				img,
				rol: "USER_ROLE",
				google: true,
			};
			usuario = new Usuario(data);
			await usuario.save();
		}
		//console.log(usuario);
		//Si el usuario en DB
		if (usuario.estado == false) {
			return res.status(403).json({
				mgs: "Hable con el administrador, usuario bloqueado",
			});
		}
		//generar token
		const token = await generarJWT(usuario.id);

		res.json({ usuario, token });
	} catch (error) {
		res.status(400).json({ mgs: "El token no se pudo verificar" });
	}
};

module.exports = { Login, googleSignIn };
