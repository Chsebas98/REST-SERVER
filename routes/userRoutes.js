const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
//controllers
const {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
} = require("../controllers/userController");
//helpers
const { esRoleValido, existeEmail } = require("../helpers/db-validators");
//middlewares
const { validarCampos } = require("../middlewares/userMiddlewares");

router.get("/", usuariosGet);
router.post(
	"/",
	[
		check("nombre", "El nombre es olbigatorio").not().isEmpty(),
		check("password", "El password debe ser más de 6 letras").isLength({
			min: 6,
		}),
		check("correo", "El correo no es válido").isEmail(),
		check("correo").custom(existeEmail),
		/* check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
		check("rol").custom(esRoleValido),
		validarCampos,
	],
	usuariosPost
);
router.put("/:id", usuariosPut);
router.delete("/", usuariosDelete);

module.exports = router;
