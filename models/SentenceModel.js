import mongoose from "mongoose";
const { Schema } = mongoose;

const sentenceSchema = new Schema({
	sentence: {
		type: String,
		required: true,
		trim: true,
		maxLength: 200,
	},
	mean: {
		type: String,
		required: true,
		trim: true,
		maxLength: 300,
	},
	note: {
		type: String,
		trim: true,
		maxLength: 100,
	},
	topics: [String],
	isChecked: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const SentenceModel = mongoose.model("sentence_model", sentenceSchema);

export default SentenceModel;
