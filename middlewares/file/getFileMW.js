import { gridFsBucket } from "../../config/gridFS.js";

export default async function getFileMW(req, res) {
	const { fileId } = req.params;
	const { show } = req.query;
	const { files } = res.locals;

	try {
		const [file] = files.filter((f) => f._id.toString() === fileId);
		if (!file) return res.send("No image was found.");

		if (file.contentType.includes("image") || show === "true") {
			const readStream = gridFsBucket.openDownloadStream(file._id);
			return readStream.pipe(res);
		} else {
			return res.send(file);
		}
	} catch (e) {
		return res.send(`Error fetching the image with ID: ${fileId}.\n${e}`);
	}
}
