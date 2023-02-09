export default function getUserFromAuthMW(User) {
	return async (req, res) => {
		const { userUid } = req.params;
		if (!userUid) return res.send("No user UID was given.");

		try {
			const user = await User.findOne({ uid: userUid });

			return res.send(user);
		} catch (e) {
			return res.send(`Error fetching the user with UID: ${userUid}\n${e}`);
		}
	};
}
