import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vocabSchema = new Schema({
  word: String,
  meaning: String,
  phonetics: String,
  explanation: String,
  example: String,
  viExample: String,
  image: String,
  audio: String,
});

const VocabModel = mongoose.model("Vocab", vocabSchema);

export default VocabModel;
