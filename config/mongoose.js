import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { gfs, initGridFS } from "./gridFS.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoURI, {
	// useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

conn.once("open", () => {
	// GridFS
	initGridFS();
});
export { conn };

export default async function connectToDb() {
	try {
		const conn = await mongoose.connect(mongoURI);

		console.log("MongoDB connected: ", conn.connection.host);

		console.log("GridFS: ", gfs);
	} catch (e) {
		Promise.reject("Error connecting to DB.\n", e);
	}
}
