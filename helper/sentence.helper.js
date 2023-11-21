import { addTopicsQuery } from "../helper/word-pack.helper.js";
import SentenceModel from "../models/SentenceModel.js";

export const getTotalSentencesService = async (topics = []) => {
	try {
		let query = {};
		addTopicsQuery(topics, query);

		const total = await SentenceModel.countDocuments(query);
		return total;
	} catch (error) {
		throw error;
	}
};

export const getSentenceListService = async (
	page = 1,
	perPage = 20,
	topics = []
) => {
	try {
		const pageInt = parseInt(page),
			perPageInt = parseInt(perPage);
		const skip = (pageInt - 1) * perPageInt;

		let query = {};
		// query multiple topic
		addTopicsQuery(topics, query);

		const list = await SentenceModel.find(query)
			.skip(skip)
			.limit(perPageInt)
			.select("-_id -isChecked -topics");

		return list;
	} catch (error) {
		throw error;
	}
};
