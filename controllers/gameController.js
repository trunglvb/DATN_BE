// ======== CORRECT WORD GAME ========

import { getWordPack, randomWordQuestionPack } from "../helper/game.helper.js";
import { apiHelper } from "../utils/apiHelper.js";

export const getWordPackCWG = async (req, res) => {
	let { nQuestion = 20, ...packInfo } = req.query;

	nQuestion = parseInt(nQuestion);
	if (nQuestion > 500) nQuestion = 500;

	const packages = await getWordPack(
		packInfo,
		0,
		1500,
		"-_id word mean phonetic synonyms picture"
	);

	const packLen = packages.length > nQuestion ? nQuestion : packages.length;

	if (packLen < 4) {
		return res.status(200).json({ wordPack: [] });
	}
	const wordPack = randomWordQuestionPack(packages, packLen).filter(
		(item) => item?.word?.indexOf(" ") === -1
	);

	if (!wordPack) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		wordPack,
	});
};

// ======== WORD MATCH GAME ========
export const getWordPackWMG = async (req, res) => {
	let { nQuestion = 20, ...packInfo } = req.query;
	nQuestion = parseInt(nQuestion);
	if (nQuestion > 500) nQuestion = 500;

	const seedList = await getWordPack(
		packInfo,
		0,
		1500,
		"-_id word mean picture"
	);

	if (!seedList) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		wordPack: seedList
			?.filter((item) => item?.word?.indexOf(" ") === -1)
			.sort((_) => Math.random() - 0.5)
			.slice(0, nQuestion),
	});
};
