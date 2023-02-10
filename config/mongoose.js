import mongoose from "mongoose";
import Grid from "gridfs-stream";
import * as dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

let gfs = null,
	gridFsBucket = null;
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
			gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
				bucketName: "uploadss",
			});

			gfs = Grid(conn.db, mongoose.mongo);
			gfs.collection("uploads");

			console.log("GridFS: ", gfs);
		});
	} catch (e) {
		Promise.reject("Error connecting to DB.\n", e);
	}
}

export { gfs, gridFsBucket };
