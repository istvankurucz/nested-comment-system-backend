// import { gfs } from "../../config/mongoose.js";
import { gridFs } from "../../config/mongoose.js";

export default async function (req, res, next) {
	console.log("gfs in MW:\n", gridFs);
	try {
		const files = await gridFs.gfs.files.find().toArray();
		if (!files.length) return next("No image was found.");

		res.locals.files = files;
		return next();
	} catch (e) {
		return next(`Error fetching the images.\n${e}`);
	}
}
