export default function deletePostCommentsMW(Comment) {
	return async (req, res, next) => {
		const { postId } = req.params;

		try {
			await Comment.deleteMany({ post: postId });
			// console.log("The comments have been deleted successfully.");

			return next();
		} catch (e) {
			return next(`Error deleting the comments with postId: ${postId}.\n${e}`);
		}
	};
}
