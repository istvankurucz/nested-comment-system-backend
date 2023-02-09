export default function addPostMW(Post) {
	return async (req, res, next) => {
		if (!req.body.user) return next("No post data was sent.");

		try {
			const newPost = new Post(req.body);
			await newPost.save();

			res.locals.newPost = newPost;
			return next();
		} catch (e) {
			return next(`Error adding the new post.\n${e}`);
		}
	};
}
