import mongoose from "mongoose";
import { gridFs } from "../../config/mongoose.js";
// import { gridFsBucket } from "../../config/mongoose.js";

export default function deleteFileMW(hasNext = false) {
	return async (req, res, next) => {
		const { imgId } = req.params;
		if (!imgId) {
			if (!hasNext) return res.send(`There is no image ID!`);
			else return next();
		}

		try {
			await gridFs.gridFsBucket.delete(new mongoose.Types.ObjectId(imgId));
			if (!hasNext) return res.send(`File deleted with ID: ${imgId}`);
			else return next();
		} catch (e) {
			return res.send(`Error deleting the file with ID: ${imgId}\n${e}`);
		}
	};
}
