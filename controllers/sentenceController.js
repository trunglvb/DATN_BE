import {
	getTotalSentencesService,
	getSentenceListService,
} from "../helper/sentence.helper.js";
import { apiHelper } from "../utils/apiHelper.js";
import SentenceModel from "../models/SentenceModel.js";

const getTotalSentences = async (req, res) => {
	let { topics } = req.query;
	topics = typeof topics === "string" ? JSON.parse(topics) : [];
	const total = await getTotalSentencesService(topics);
	if (!total) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		total,
	});
};

const getSentenceList = async (req, res) => {
	let { page = 1, perPage = 50, topics } = req.query;
	topics = typeof topics === "string" ? JSON.parse(topics) : [];
	const sentenceList = await getSentenceListService(page, perPage, topics);
	if (!sentenceList) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		sentenceList,
	});
};

const updateSentenceCheck = async (req, res) => {
	const { sentenceId } = req.params;
	const { isChecked } = req.body;
	await SentenceModel.updateOne(
		{ _id: sentenceId },
		{
			$set: {
				isChecked: isChecked,
			},
		}
	);
	const sentence = await SentenceModel.findById(sentenceId);
	if (!sentence) {
		return apiHelper.sendError(res, "Sentence Not Found");
	}
	return apiHelper.sendSuccessResponse(res, "Successfully", { sentence });
};
export { getSentenceList, getTotalSentences, updateSentenceCheck };
