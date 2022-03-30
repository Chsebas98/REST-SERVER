require("dotenv").config();
const mongoose = require("mongoose");
const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("BD Conectada");
	} catch (error) {
		console.log(error);
		throw Error("Couldn't connect");
	}
};

module.exports = { dbConnection };
