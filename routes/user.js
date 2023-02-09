import express from "express";
import deleteFileMW from "../middlewares/file/deleteFileMW.js";
import addUserMW from "../middlewares/user/addUserMW.js";
import deleteUserMW from "../middlewares/user/deleteUserMW.js";
import getImgIdFromUserMW from "../middlewares/user/getImgIdFromUserMW.js";
import getUserFromAuthMW from "../middlewares/user/getUserFromAuthMW.js";
import getUserMW from "../middlewares/user/getUserMW.js";
import updatePersonalMW from "../middlewares/user/updatePersonalMW.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:userId/posts", getUserMW(User), (req, res) => {
	const { posts } = res.locals.user;
	return res.send(posts.reverse());
});

router.post("/new", addUserMW(User));

router.get("/:userUid", getUserFromAuthMW(User));
router.put("/:userId", getUserMW(User), updatePersonalMW, deleteFileMW(false));
router.delete("/:userId", getUserMW(User), getImgIdFromUserMW, deleteFileMW(true), deleteUserMW(User)); // delete the photo of the user, delete the posts of the user, delete the comments of the post

export default router;
