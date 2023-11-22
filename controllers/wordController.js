import WordModel from "../models/WordModel.js";
import { apiHelper } from "../utils/apiHelper.js";

const getWordDetail = async (word = "") => {
	try {
		const res = await WordModel.findOne({ word });
		return res;
	} catch (error) {
		throw error;
	}
};

export const getWordDetails = async (req, res) => {
	const { word } = req.query;
	const wordDetail = await getWordDetail(word);
	if (!wordDetail) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		wordDetail,
	});
};
