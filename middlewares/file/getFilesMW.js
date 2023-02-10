import { gfs } from "../../config/mongoose.js";

export default async function (req, res, next) {
	console.log("GridFS in getFilesMW:\n", gfs);

	try {
		const files = await gfs.files.find().toArray();
		if (!files.length) return next("No image was found.");

		res.locals.files = files;
		return next();
	} catch (e) {
		return next(`Error fetching the images.\n${e}`);
	}
}
