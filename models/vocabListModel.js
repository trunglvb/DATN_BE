import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const vocabListSchema = new Schema(
	{
		topicTitle: String,
		videoSrc: String,
		wordList: [
			{
				word: String,
				meaning: String,
				phonetics: String,
				explanation: String,
				example: String,
				viExample: String,
				image: String,
				audio: String,
				spell: String,
				isComplete: {
					type: Boolean,
					default: false,
				},
			},
		],
		vocab: [{ type: mongoose.Schema.Types.ObjectId, ref: "vocab_model" }],
	},
	{
		timestamps: true,
	}
);

const VocabListModel = mongoose.model("VocabList", vocabListSchema);

export default VocabListModel;
