import mongoose from "mongoose";

const { Schema } = mongoose;

const dictionariViEnSchema = new Schema({
	word: String,
	spell: String,
	data: {
		partOfSpeech: String,
		meanings: [
			{
				definition: String,
				details: [String],
			},
		],
	},
});

const DictionariViEModel = mongoose.model(
	"ditionaryvien_models",
	dictionariViEnSchema
);

export default DictionariViEModel;
