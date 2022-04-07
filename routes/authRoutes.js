const { Router } = require("express");
const router = Router();
//controllers
const { Login, googleSignIn } = require("../controllers/authController");
//middlewares
const { check } = require("express-validator");
//helpers
const { validarCampos } = require("../middlewares/userMiddlewares");
//rutas
router.post(
	"/login",
	[
		check("correo", "El correo es necesario").isEmail(),
		check("password", "La contraseña es necesaria").not().isEmpty(),
		validarCampos,
	],
	Login
);
router.post(
	"/google",
	[
		check("id_token", "No existe un token de google").not().isEmpty(),
		validarCampos,
	],
	googleSignIn
);

module.exports = router;
