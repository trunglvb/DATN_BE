import DictionariViEModel from "../models/DictionaryViEn.js";
import { apiHelper } from "../utils/apiHelper.js";

const getListDictionaryViEn = async (_req, res) => {
	const data = await DictionariViEModel.find();
	if (!data) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		data,
	});
};

const getListWordViEn = async (req, res) => {
	const word = await DictionariViEModel.find({
		word: { $regex: `@${req.params.word}` },
	}).limit(20);

	if (!word) {
		return apiHelper.sendError(res, "No Data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully", {
		word,
	});
};

const getWordViEnDetails = async (req, res) => {
	const word = await DictionariViEModel.find({
		word: req.params.word,
	});

	if (!word) {
		return apiHelper.sendError(res, "No Data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully", {
		word,
	});
};
export { getListDictionaryViEn, getListWordViEn, getWordViEnDetails };
