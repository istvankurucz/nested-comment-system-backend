export default function deleteUserMW(User) {
	return async (req, res) => {
		const { userId } = req.params;

		try {
			await User.deleteOne({ _id: userId });

			return res.send(`The user has been deleted successfully with ID: ${userId}`);
		} catch (e) {
			return res.send(`Error deleting the pot with ID: ${userId}.\n${e}`);
		}
	};
}
