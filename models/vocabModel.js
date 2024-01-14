import mongoose from "mongoose";

const { Schema } = mongoose;

const vocabSchema = new Schema({
	word: String,
	meaning: String,
	image: String,
	audio: String,
	spell: String,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "VocabList",
	},
});

const VocabModel = mongoose.model("vocab_model", vocabSchema);

export default VocabModel;
