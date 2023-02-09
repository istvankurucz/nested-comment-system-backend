import mongoose from "mongoose";
import { gridFsBucket } from "../../config/gridFS.js";

export default function deleteFileMW(hasNext = false) {
	return async (req, res, next) => {
		const { imgId } = req.params;
		if (!imgId) {
			if (!hasNext) return res.send(`There is no image ID!`);
			else return next();
		}

		try {
			await gridFsBucket.delete(new mongoose.Types.ObjectId(imgId));
			if (!hasNext) return res.send(`File deleted with ID: ${imgId}`);
			else return next();
		} catch (e) {
			return res.send(`Error deleting the file with ID: ${imgId}\n${e}`);
		}
	};
}
