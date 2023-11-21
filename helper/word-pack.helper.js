export const addTopicsQuery = (topics, query) => {
	// query multiple topic
	if (topics.length > 0) {
		let orList = [];
		topics.forEach((topic) =>
			orList.push({ topics: { $elemMatch: { $eq: topic } } })
		);
		query["$or"] = orList;
	}

	return query;
};

export const convertPackInfoToQueryStr = (packInfo) => {
	const { topics, ...restPackInfo } = packInfo;
	const topicList = typeof topics === "string" ? JSON.parse(topics) : topics;

	// generate query string
	let query = {};
	for (let key in restPackInfo) {
		if (packInfo[key] !== "-1") {
			query[key] = packInfo[key];
		}
	}

	// query multiple topic
	addTopicsQuery(topicList, query);

	return query;
};
