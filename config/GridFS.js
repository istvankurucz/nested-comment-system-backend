/*import Grid from "gridfs-stream";
import mongoose from "mongoose";
import { conn } from "./mongoose.js";

let gfs, gridFsBucket;

function initGridFS() {
	// GridFS
	gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads",
	});

	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("uploads");

	console.log("gridFS connected");
}

export { gfs, gridFsBucket, initGridFS };*/

class GridFS {
	constructor() {
		this.gfs = null;
		this.gridFsBucket = null;
	}
}

export default GridFS;
