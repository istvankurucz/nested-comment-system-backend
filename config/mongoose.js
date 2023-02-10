import mongoose from "mongoose";
import Grid from "gridfs-stream";
// import GridFS from "./gridFS.js";
import * as dotenv from "dotenv";
// import { initGridFS } from "./gridFS.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

// let gfs, gridFsBucket;
class GridFS {
	constructor() {
		this.gfs = null;
		this.gridFsBucket = null;
	}
}
const gridFs = new GridFS();
const conn = mongoose.createConnection(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
conn.once("open", () => {
	// GridFS
	gridFs.gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads",
	});

	gridFs.gfs = Grid(conn.db, mongoose.mongo);
	gridFs.gfs.collection("uploads");

	console.log("gridFS connected");
});
// export { conn };

export default async function connectToDb() {
	try {
		const conn = await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("MongoDB connected: ", conn.connection.host);
	} catch (e) {
		Promise.reject("Error connecting to DB.\n", e);
	}
}

// export { gfs, gridFsBucket };
export { gridFs };
