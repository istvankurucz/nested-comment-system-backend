export default async function addPostToUserMW(req, res) {
	const { newPost, user } = res.locals;
	if (!newPost) return res.send("There is no post.");
	if (!user) return res.send("There is no user.");

	try {
		user.posts = [...user.posts, newPost._id];
		await user.save();

		return res.send(newPost);
	} catch (e) {
		return res.send(`Error updating the posts of the user.\n${e}`);
	}
}
