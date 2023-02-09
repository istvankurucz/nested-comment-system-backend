export default function getParentFromCommentMW(Post, Comment) {
	return async (req, res, next) => {
		const { post, parent } = req.body;

		try {
			const Model = post === parent ? Post : Comment;
			const parentFromDb = await Model.findById(parent);
			if (!parentFromDb) return next(`No parent with ID: ${parent}`);

			res.locals.parent = parentFromDb;
			return next();
		} catch (e) {
			return next(`Error fetching the post from the comment.\n${e}`);
		}
	};
}
