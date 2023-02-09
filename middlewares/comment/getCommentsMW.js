export default function getCommentsMW(Comment) {
	return async (req, res) => {
		const { parentId } = req.params;
		const { limit } = req.query;

		try {
			const comments = limit
				? await Comment.find({ parent: parentId }).limit(limit).populate("user")
				: await Comment.find({ parent: parentId }).populate("user");

			return res.send(comments);
		} catch (e) {
			return res.send(`Error fetching the posts of parent: ${parentId}\n${e}`);
		}
	};
}
