export default function getUserMW(User) {
	return async (req, res, next) => {
		const { userId } = req.params;
		if (!userId) return next("No userId was given.");

		try {
			const user = await User.findById(userId).populate("posts");
			if (!user) return next(`No user was found with ID: ${userId}.`);

			res.locals.user = user;
			return next();
		} catch (e) {
			return next(`Error fetching the user with ID: ${userId}\n${e}`);
		}
	};
}
