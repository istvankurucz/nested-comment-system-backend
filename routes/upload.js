import express from "express";
import upload from "../config/multer.js";
import getFilesMW from "../middlewares/file/getFilesMW.js";
import deleteFileMW from "../middlewares/file/deleteFileMW.js";
import getFileMW from "../middlewares/file/getFileMW.js";

const router = express.Router();

router.get("/:fileId", getFilesMW, getFileMW);

router.delete("/:imgId", deleteFileMW(false));

router.post("/", upload.array("file", 10), (req, res) => {
	return res.send(req.files);
});

export default router;
