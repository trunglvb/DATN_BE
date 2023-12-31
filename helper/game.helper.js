import { convertPackInfoToQueryStr } from "./word-pack.helper.js";
import WordModel from "../models/WordModel.js";

export const getWordPack = async (
	packInfo = {},
	skip = 0,
	limit = 500,
	select = "",
	sortType = null,
	expandQuery = null
) => {
	try {
		let query = convertPackInfoToQueryStr(packInfo);

		// add expand query
		if (expandQuery && typeof expandQuery === "object") {
			Object.assign(query, expandQuery);
		}

		const packList = await WordModel.find(query)
			.sort({ word: sortType })
			.skip(skip)
			.limit(limit)
			.select(select);

		return packList;
	} catch (error) {
		throw error;
	}
};

export const generateWrongWordList = (
	word = "",
	synonyms = [],
	list = [],
	isCheck = false
) => {
	const n = list.length;
	if (!n || n <= 3) {
		return [];
	}

	// check if the list is already a confusing list ?
	const filteredList = isCheck ? list : list.filter((i) => i.word !== word);

	if (synonyms && synonyms.length === 0) {
		return filteredList
			.map((i) => ({ word: i.word, phonetic: i.phonetic }))
			.sort(() => Math.random() - 0.5)
			.slice(0, 3);
	}

	let flag = true,
		count = 0; // prevent stack overflow because of infinite loop

	while (flag) {
		const resList = filteredList
			.sort(() => Math.random() - 0.5)
			.slice(0, 3);
		let isOk = true;

		resList.forEach((i) => {
			if (synonyms.findIndex((w) => w === i.word) !== -1) isOk = false;
		});

		if (isOk) {
			flag = false;
			return resList.map((i) => ({ word: i.word, phonetic: i.phonetic }));
		}

		if (count > 100) {
			return [];
		}

		++count;
	}
};

export const randomWordQuestionPack = (list = [], amount = 100) => {
	const n = amount < list.length ? amount : list.length;
	let result = [];

	// shuffle list and generate seed list
	const seedList = list.sort(() => Math.random() - 0.5).slice(0, n);
	let confusingList = list.slice(n + 1);
	const isEnough = confusingList.length > 20;

	for (let i = 0; i < n; ++i) {
		const { word, mean, phonetic, synonyms, picture } = seedList[i];
		result.push({
			word,
			mean,
			phonetic,
			picture,
			// If size of confusing list too small then use all item of list
			wrongList: isEnough
				? generateWrongWordList(word, synonyms, confusingList, true)
				: generateWrongWordList(word, synonyms, list, false),
		});
	}

	return result;
};
