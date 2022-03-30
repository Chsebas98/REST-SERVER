const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	correo: {
		type: String,
		required: [true, "Correo es obligatorio"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "El password es obligatorio"],
	},
	img: {
		type: String,
	},
	rol: {
		type: String,
		required: [true, "El rol es obligatorio"],
		enum: ["ADMIN_ROLE", "USER_ROLE"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UsuarioSchema.methods.toJSON = function () {
	const { __v, password, ...usuario } = this.toObject();
	return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
