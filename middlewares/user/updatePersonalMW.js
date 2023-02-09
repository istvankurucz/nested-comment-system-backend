export default async function updatePersonalMW(req, res, next) {
	const { user } = res.locals;
	const { username, email, photoUrl } = req.body;

	if (username) user.name = username;
	if (email) user.email = email;
	if (photoUrl) {
		const imgId = user.photoUrl.substr("http://localhost:3001/uploads/".length);
		req.params.imgId = imgId;
		user.photoUrl = photoUrl;

		await user.save();
		return next();
	}

	try {
		await user.save();
		if (!res.headersSent) return res.send(user);
	} catch (e) {
		return res.send(`Error updating the personal data of the user with ID: ${user._id}.\n${e}`);
	}
}
