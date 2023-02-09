export default async function deletePostFromUserMW(req, res, next) {
	const { postId } = req.params;
	const { user } = res.locals;

	const postIndex = user.posts.indexOf(postId);
	user.posts.splice(postIndex, 1);
	try {
		await user.save();

		return next();
	} catch (e) {
		return next(`Error removing the post from the user.\n${e}`);
	}
}
