import { gfs } from "../../config/gridFS.js";

export default async function (req, res, next) {
	try {
		const files = await gfs.files.find().toArray();
		if (!files.length) return next("No image was found.");

		res.locals.files = files;
		return next();
	} catch (e) {
		return next(`Error fetching the images.\n${e}`);
	}
}
