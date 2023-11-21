import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
		maxLength: 200,
		trim: true,
	},
	desc: {
		type: String,
		required: true,
		maxLength: 300,
		trim: true,
	},
	html: {
		type: String,
		required: true,
		trim: true,
	},
});

const BlogModel = mongoose.model("blog_models", blogSchema);

export default BlogModel;
