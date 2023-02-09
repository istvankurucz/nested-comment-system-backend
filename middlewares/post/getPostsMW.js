export default function getPostsMW(Post) {
	return async (req, res) => {
		const { limit } = req.query;

		try {
			const response = limit
				? await Post.find().sort({ createdAt: -1 }).limit(limit).populate("user")
				: await Post.find().sort({ createdAt: -1 }).populate("user");

			return res.send(response);
		} catch (e) {
			return res.send(`Error fetching the posts.\n${e}`);
		}
	};
}
