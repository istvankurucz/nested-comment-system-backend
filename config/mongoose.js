import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { initGridFS } from "./gridFS.js";

dotenv.config();

export const mongoURI = process.env.MONGO_URI;

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

export default function connectToDb() {
	mongoose.connect(
		mongoURI,
		{
			// useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(e) => {
			if (e) console.log("Error connecting to DB.\n", e);
			else console.log("Connected to DB");
		}
	);
}
