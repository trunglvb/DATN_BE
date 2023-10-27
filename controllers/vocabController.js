import { apiHelper } from "../utils/apiHelper.js";
import VocabModel from "../models/vocabModel.js";
import VocabListModel from "../models/vocabListModel.js";

const createVocabList = async (req, res) => {
	const { title } = req.body;

	const newList = new VocabListModel({
		topicTitle: title,
	});
	try {
		await newList.save();
		return apiHelper.sendSuccessResponse(
			res,
			"Created list successfully",
			{
				newList,
			},
			201
		);
	} catch (e) {
		return apiHelper.sendError(res, "Error");
	}
};

const getAllLists = async (req, res) => {
	const lists = await VocabListModel.find({});
	return apiHelper.sendSuccessResponse(res, "Successfully get data", lists);
};

const getListDetail = async (req, res) => {
	const { listId } = req.params;

	const listDetail = await VocabListModel.findById(listId);
	const vocabs = await VocabModel.find({ listId: listId });
	if (!listDetail) {
		return apiHelper.sendError(res, "List not found", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		listDetail,
		vocabs,
	});
};

const addNewWord = async (req, res) => {
	const { listId } = req.params;
	const { word, definition, image } = req.body;
	const list = await VocabListModel.findById(listId);
	if (!list) {
		return apiHelper.sendError(res, "List not found", 404);
	}
	const newWord = new VocabModel({
		listId: listId,
		word: word,
		definition: definition,
		image: image,
	});
	try {
		await newWord.save();
		return apiHelper.sendSuccessResponse(
			res,
			"Added successfully",
			{
				newWord,
			},
			201
		);
	} catch (e) {
		return apiHelper.sendError(res, "Error occurs", 403);
	}
};

const deleteWord = async (req, res) => {
	const { listId, wordId } = req.params;
	const list = await VocabListModel.findById(listId);
	if (!list) {
		return apiHelper.sendError(res, "List not found", 404);
	}
	const word = await VocabModel.findById(wordId);
	if (!word) {
		return apiHelper.sendError(res, "Word not found", 404);
	}
	try {
		await VocabModel.findByIdAndDelete(wordId);
		return apiHelper.sendSuccessResponse(res, "Deleted successfully");
	} catch (e) {
		return apiHelper.sendError(res, e, 403);
	}
};

export { getAllLists, addNewWord, deleteWord, getListDetail, createVocabList };
