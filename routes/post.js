import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

import addPostMW from "../middlewares/post/addPostMW.js";
import getUserFromPostMW from "../middlewares/user/getUserFromPostMW.js";
import addPostToUserMW from "../middlewares/user/addPostToUserMW.js";
import getPostMW from "../middlewares/post/getPostMW.js";
import updateLikesAndSharesMW from "../middlewares/post/updateLikesAndSharesMW.js";
import deletePostFromUserMW from "../middlewares/user/deletePostFromUserMW.js";
import deletePostCommentsMW from "../middlewares/comment/deletePostCommentsMW.js";
import deletePostMW from "../middlewares/post/deletePostMW.js";
import getPostsMW from "../middlewares/post/getPostsMW.js";

const router = express.Router();

router.get("/:postId", getPostMW(Post, true));
router.put("/:postId", getPostMW(Post), updateLikesAndSharesMW);
router.delete(
	"/:postId",
	getPostMW(Post),
	getUserFromPostMW(User, false),
	deletePostFromUserMW,
	deletePostCommentsMW(Comment),
	deletePostMW(Post)
);

router.post("/new", addPostMW(Post), getUserFromPostMW(User), addPostToUserMW);

router.get("/", getPostsMW(Post));

export default router;
