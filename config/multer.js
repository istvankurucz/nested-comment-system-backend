import multer from "multer";
import * as dotenv from "dotenv";
import { GridFsStorage } from "multer-gridfs-storage";

dotenv.config();

const storage = new GridFsStorage({
	url: process.env.MONGO_URI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			const fileInfo = {
				filename: file.originalname,
				bucketName: "uploads",
			};

			resolve(fileInfo);
		});
	},
});

const upload = multer({ storage });

export default upload;
