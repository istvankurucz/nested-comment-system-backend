import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		photoUrl: String,
		email: {
			type: String,
			required: true,
		},
		posts: {
			type: [Schema.Types.ObjectId],
			ref: "Post",
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema);
