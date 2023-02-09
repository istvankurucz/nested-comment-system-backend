export default function deletePostMW(Post) {
	return async (req, res) => {
		const { postId } = req.params;

		try {
			await Post.deleteOne({ _id: postId });

			return res.send(`The post has been deleted successfully with ID: ${postId}`);
		} catch (e) {
			return res.send(`Error deleting the pot with ID: ${postId}.\n${e}`);
		}
	};
}
