export default function getUserFromPostMW(User, fromBody = true) {
	return async (req, res, next) => {
		const user = fromBody ? req.body.user : res.locals.post.user._id;
		if (!user) return next("No ID was found.");

		try {
			const userFromDB = await User.findById(user);
			if (!userFromDB) return next(`No user with ID: ${user}`);

			res.locals.user = userFromDB;
			return next();
		} catch (e) {
			return next(`Error fetching the user with ID: ${user}.\n${e}`);
		}
	};
}
