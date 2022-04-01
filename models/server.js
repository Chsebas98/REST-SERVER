const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/authRoutes");
const { dbConnection } = require("../database/config");
class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = "/api/usuarios";
		this.authPath = "/api/auth";
		//conexio a base de datos
		this.conectarDB();
		//middlewares
		this.middlewares();
		//rutas
		this.routes();
	}
	async conectarDB() {
		await dbConnection();
	}
	middlewares() {
		//carpeta publica
		this.app.use(express.static("public"));
		//CORS
		this.app.use(cors());
		//Lectura y parseo del body
		this.app.use(express.json());
	}
	routes() {
		this.app.use(this.usuariosPath, userRoutes);
		this.app.use(this.authPath, authRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor corriendo en http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
