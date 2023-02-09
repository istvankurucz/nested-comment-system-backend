import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
import crypto from "crypto";
import { mongoURI } from "./mongoose.js";

const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		// console.log("GridFsStorage file:\n", file);

		return new Promise((resolve, reject) => {
			const fileInfo = {
				filename: file.originalname,
				bucketName: "uploads",
			};

			resolve(fileInfo);

			/*crypto.randomBytes(16, (err, buf) => {
				if (err) return reject(err);

				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads",
				};

				resolve(fileInfo);
			});*/
		});
	},
});

const upload = multer({ storage });

export default upload;
