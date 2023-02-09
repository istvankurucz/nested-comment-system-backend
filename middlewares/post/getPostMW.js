export default function getPostMW(Post, returnPost = false) {
	return async (req, res, next) => {
		const { postId } = req.params;

		try {
			const post = await Post.findById(postId).populate("user");
			if (!post) return next(`No post with ID: ${postId}.`);

			if (returnPost) return res.send(post);
			else {
				res.locals.post = post;
				return next();
			}
		} catch (e) {
			return next(`Error fetching the post with ID: ${postId}\n${e}`);
		}
	};
}
