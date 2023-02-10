import mongoose from "mongoose";
import Grid from "gridfs-stream";
import GridFS from "./gridFS.js";
import * as dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const gridFs = new GridFS();

export default async function connectToDb() {
	try {
		// Connect to MongoDB
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");

		// Connect to GridFS
		const conn = mongoose.createConnection(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await conn.once("open", () => {
			gridFs.gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
				bucketName: "uploadss",
			});

			gridFs.gfs = Grid(conn.db, mongoose.mongo);
			gridFs.gfs.collection("uploads");

			console.log("GridFS: ", gridFs.gfs);
		});
	} catch (e) {
		Promise.reject("Error connecting to DB.\n", e);
	}
}

export { gridFs };
