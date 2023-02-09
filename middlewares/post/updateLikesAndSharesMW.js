export default async function updateLikesAndSharesMW(req, res) {
	const { field } = req.query;
	const { post } = res.locals;

	try {
		const userId = post.user._id.toString();
		const array = post[field];

		if (array.includes(userId)) {
			const index = array.indexOf(userId);
			array.splice(index, 1);
		} else {
			array.push(userId);
		}
		post[field] = array;

		await post.save();
		return res.send(post);
	} catch (e) {
		return res.send(`Error updating the likes/shares of the post with ID: ${post._id}`);
	}
}
