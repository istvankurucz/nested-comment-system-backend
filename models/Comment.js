import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			reguired: true,
		},
		text: String,
		photos: {
			type: [String],
			default: [],
			required: true,
		},
		files: {
			type: [String],
			default: [],
			required: true,
		},
		likes: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
			required: true,
		},
		shares: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
			required: true,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		parent: {
			type: Schema.Types.ObjectId,
		},
		comments: {
			type: [Schema.Types.ObjectId],
			ref: "Comment",
			default: [],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Comment", commentSchema);
