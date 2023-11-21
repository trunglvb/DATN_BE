import mongoose from "mongoose";
const { Schema } = mongoose;

const NUM_OF_TOPICS = 30;
const NUM_OF_SPECIALTY = 30;

const wordSchema = new Schema({
	word: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	mean: {
		type: String,
		required: true,
		trim: true,
		maxLength: 100,
	},
	type: {
		type: String,
		enum: ["", "n", "adj", "adv", "v", "con", "pre", "pro", "det"],
		default: "",
	},
	level: {
		type: String,
		required: true,
		enum: ["0", "A1", "A2", "B1", "B2", "C1", "C2"],
		default: "0",
	},
	phonetic: {
		type: String,
		trim: true,
		maxLength: 50,
		default: "",
	},
	examples: [
		{
			type: String,
			maxLength: 200,
		},
	],
	// link picture source
	picture: {
		type: String,
		trim: true,
		default: null,
	},
	specialty: {
		type: String,
		enum: Array.from({ length: NUM_OF_SPECIALTY }, (_, key) =>
			key.toString()
		),
		default: "0",
	},
	topics: [
		{
			type: String,
			enum: Array.from({ length: NUM_OF_TOPICS }, (_, key) =>
				key.toString()
			),
		},
	],
	synonyms: [{ type: String, maxLength: 50 }],
	antonyms: [{ type: String, maxLength: 50 }],
	note: {
		type: String,
		trim: true,
		maxLength: 150,
	},
	isChecked: {
		type: Boolean,
		default: false,
	},
});

const WordModel = mongoose.model("word_models", wordSchema);

export default WordModel;
