import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
	title: String,
	image: {
		type: String,
		default:
			"https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg?w=2000",
	},
	author: String,
	category: String,
	description: String,
	fileName: String,
	currentPosition: Number | String,
	totalLocation: Number | String,
	url: String,
	filePath: {
		type: String,
		default: "",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const BookModel = mongoose.model("book_model", bookSchema);

export default BookModel;
