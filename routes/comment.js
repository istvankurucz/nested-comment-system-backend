import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

import addCommentMW from "../middlewares/comment/addCommentMW.js";
import getParentFromCommentMW from "../middlewares/comment/getParentFromCommentMW.js";
import updatePostCommentsMW from "../middlewares/post/updatePostCommentsMW.js";
import getCommentMW from "../middlewares/comment/getCommentMW.js";
import updateLikesAndSharesMW from "../middlewares/comment/updateLikesAndSharesMW.js";
import getCommentsMW from "../middlewares/comment/getCommentsMW.js";

const router = express.Router();

router.put("/:commentId", getCommentMW(Comment), updateLikesAndSharesMW);

router.post("/new", addCommentMW(Comment), getParentFromCommentMW(Post, Comment), updatePostCommentsMW);

router.get("/:parentId", getCommentsMW(Comment));

export default router;
