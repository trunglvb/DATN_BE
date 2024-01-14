import { apiHelper } from "../utils/apiHelper.js";
import VocabListModel from "../models/vocabListModel.js";
import VocabModel from "../models/vocabModel.js";
import UserModel from "../models/userModel.js";

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

const addVocabTopic = async (req, res) => {
	const tempNewWord = req.body;

	const newWord = new VocabModel({
		...tempNewWord,
	});

	const savedWord = await newWord.save();

	if (req.body.userId) {
		const user = UserModel.findById(req.body.userId);
		await user.updateOne({ $push: { vocabs: savedWord._id } });
	}

	if (req.body.topicId) {
		const topic = VocabListModel.findById(req.body.topicId);
		await topic.updateOne({ $push: { vocab: savedWord._id } });
	}

	return apiHelper.sendSuccessResponse(res, "Successfully add new work", {
		newWord,
	});
};

const getAllLists = async (req, res) => {
	const lists = await VocabListModel.find({});
	return apiHelper.sendSuccessResponse(res, "Successfully get data", lists);
};

export { getAllLists, createVocabList, addVocabTopic };
