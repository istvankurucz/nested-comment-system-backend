import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import connectToDb from "./config/mongoose.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import commentRoute from "./routes/comment.js";
import uploadRoute from "./routes/upload.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
);

// Routing
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/uploads", uploadRoute);

app.use((err, req, res, next) => {
	console.log(err);
	return res.end(`Error...\n${err}`);
});

// App listener
const port = process.env.PORT || 3001;
// MongoDB
connectToDb()
	.then(() => {
		app.listen(port, () => console.log(`Listening on port ${port}`));
	})
	.catch((e) => console.log(e));
