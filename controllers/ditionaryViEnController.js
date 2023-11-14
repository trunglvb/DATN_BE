import DictionariViEModel from "../models/DictionaryViEn.js";
import { apiHelper } from "../utils/apiHelper.js";
import { translate } from "google-translate-api-x";
import { HttpsProxyAgent } from "https-proxy-agent";

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

const textTranslationViEn = async (req, res) => {
	const { text } = req.body;
	const translateData = await translate(text, {
		to: "en",
		requestOptions: {
			agent: new HttpsProxyAgent("http://localhost:8080"),
		},
	});
	if (!translateData) {
		return apiHelper.sendError(res, "No Data", 404);
	}
	return res.status(200).json(translateData);
};

const textTranslationEnVi = async (req, res) => {
	const { text } = req.body;
	const translateData = await translate(text, {
		to: "vi",
		requestOptions: {
			agent: new HttpsProxyAgent("http://localhost:8080"),
		},
	});
	if (!translateData) {
		return apiHelper.sendError(res, "No Data", 404);
	}
	return res.status(200).json(translateData);
};

export {
	getListDictionaryViEn,
	getListWordViEn,
	getWordViEnDetails,
	textTranslationViEn,
	textTranslationEnVi,
};
