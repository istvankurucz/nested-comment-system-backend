export default function getCommentMW(Comment) {
	return async (req, res, next) => {
		const { commentId } = req.params;

		try {
			const comment = await Comment.findById(commentId);
			if (!comment) return next(`No comment with ID: ${commentId}.`);

			res.locals.comment = comment;
			return next();
		} catch (e) {
			return next(`Error fetching the comment with ID: ${commentId}\n${e}`);
		}
	};
}
