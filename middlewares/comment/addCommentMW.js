export default function addCommentMW(Comment) {
	return async (req, res, next) => {
		if (!req.body.post) next("No comment data was sent.");

		/*const commentData = {
         user: "63c59d52f8320a8eb3353e76",
         text: `First comment to parent: ${parentId}`,
         post: "63c6a344d5280da2472175a0",
         parent: "63c6a344d5280da2472175a0",
      };*/

		try {
			const newComment = new Comment(req.body);
			await newComment.save();

			res.locals.newComment = newComment;
			return next();
		} catch (e) {
			return next(`Error adding the comment.\n${e}`);
		}
	};
}
