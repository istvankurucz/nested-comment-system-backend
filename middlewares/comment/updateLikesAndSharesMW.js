export default async function updateLikesAndSharesMW(req, res) {
	const { field } = req.query;
	const { comment } = res.locals;

	try {
		const userId = comment.user.toString();
		const array = comment[field];

		if (array.includes(userId)) {
			const index = array.indexOf(userId);
			array.splice(index, 1);
		} else {
			array.push(userId);
		}
		comment[field] = array;

		await comment.save();
		return res.send(comment);
	} catch (e) {
		return res.send(`Error updating the likes/shares of the comment with ID: ${comment._id}`);
	}
}
