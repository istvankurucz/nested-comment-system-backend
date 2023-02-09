export default async function updatePostCommentsMW(req, res) {
	const { parent, newComment } = res.locals;

	try {
		parent.comments = [...parent.comments, newComment._id];
		await parent.save();

		return res.send(parent);
	} catch (e) {
		return res.send(`Error adding the comment to the post.\n${e}`);
	}
}
