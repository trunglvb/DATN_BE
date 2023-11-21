import { apiHelper } from "../utils/apiHelper.js";
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

export { getAllLists, createVocabList };
