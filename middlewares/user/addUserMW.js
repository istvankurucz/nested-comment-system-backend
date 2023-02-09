export default function addUserMW(User) {
	return async (req, res) => {
		if (!req.body.uid) return res.send("No user data was sent.");

		try {
			const newUser = new User(req.body);
			await newUser.save();

			return res.send(newUser);
		} catch (e) {
			return res.send(`Error adding the new user.\n${e}`);
		}
	};
}
