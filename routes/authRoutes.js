const { Router } = require("express");
const router = Router();
//controllers
const { Login } = require("../controllers/authController");
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

module.exports = router;
