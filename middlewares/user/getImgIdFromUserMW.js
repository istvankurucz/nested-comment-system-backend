export default function (req, res, next) {
	const { user } = res.locals;
	const imgId = user.photoUrl.substr(`${process.env.SERVER_URL}/uploads/`.length);
	req.params.imgId = imgId;
	next();
}
