import {
	getTotalSentencesService,
	getSentenceListService,
} from "../helper/sentence.helper.js";
import { apiHelper } from "../utils/apiHelper.js";

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
	let { page = 1, perPage = 20, topics } = req.query;
	topics = typeof topics === "string" ? JSON.parse(topics) : [];
	const sentenceList = await getSentenceListService(page, perPage, topics);
	if (!sentenceList) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		sentenceList,
	});
};

export { getSentenceList, getTotalSentences };
