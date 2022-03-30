const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		mongoose.connect(process.env.MONGODB_CNN);
		console.log("BD Conectada");
	} catch (error) {
		console.log(erorr);
		throw Error("Couldn't connect");
	}
};

module.exports = { dbConnection };
