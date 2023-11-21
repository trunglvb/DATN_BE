import * as cheerio from "cheerio";
import fetch from "node-fetch";
import VocabListModel from "../models/vocabListModel.js";

export const BASE_URL =
	"https://learnenglish.britishcouncil.org/skills/listening/";
export const BASE_URL_IMAGE = "https://learnenglish.britishcouncil.org";

export async function getHtmlFromUrl(url) {
	try {
		const res = await fetch(url);
		return await res.text();
	} catch (e) {
		console.error(e);
		return "";
	}
}

const Vocab_Urls = [
	"https://tienganhtflat.com/blog/toeic-words-marketing",
	"https://tienganhtflat.com/blog/toeic-words-computers-and-the-internet",
	"https://tienganhtflat.com/blog/toeic-words-salaries-benefits",
	"https://tienganhtflat.com/blog/toeic-words-hospitals",
	"https://tienganhtflat.com/blog/toeic-words-investment",
	"https://tienganhtflat.com/blog/toeic-words-apply-and-interviewing",
];
export async function getVocabularyLists(url) {
	const htmlText = await getHtmlFromUrl(url);
	const $ = cheerio.load(htmlText);
	const header = $(".detail > .header2 > h1").text();
	const video = $(".detail > .content").find("video");
	const videoSrc = $(video).find("source").attr("src");
	const wordListEle = $(".detail").find(".words-list > .item-content");
	const wordList = [];
	for (let i = 0; i < 10; i++) {
		const element = wordListEle[i];
		const firstPTag = $(element).find("div").find("p")[0];
		const word = $(firstPTag).find("b").text();
		const meaning = $(firstPTag).find("i").text();
		const audio = $(firstPTag).find("a").attr("href");
		const image = $(element).find(".img-thumb").attr("src");

		wordList.push({
			word,
			meaning,
			audio,
			image,
		});
	}
	return {
		topicTitle: header,
		videoSrc: videoSrc,
		wordList: wordList,
	};
}

export async function getPodcastDetail(detailLink) {
	const htmlText = await getHtmlFromUrl(detailLink);
	const $ = cheerio.load(htmlText);

	const content = $(".content");
	const audioElement = $(content).find("audio");
	const audioLink = $(audioElement).attr("src");

	const transcriptWrapper = $(
		"div.content > div.effect-none > div.field-group-format-wrapper"
	).find("div.field");

	const transcriptItemElements = $(transcriptWrapper).find("p");
	const transcriptItems = [];

	for (let i = 0; i < transcriptItemElements.length; i++) {
		const element = transcriptItemElements[i];
		const strongText = $(element).find("strong").text();
		const elementText = $(element).text();
		transcriptItems.push({
			person: strongText,
			speech: elementText,
		});
	}

	const detail = {
		audioLink: audioLink,
		transcriptItems: transcriptItems,
	};
	return detail;
}

export async function getListPodcastsFromHtml(htmlText) {
	const $ = cheerio.load(htmlText);

	const list = $(".view-content");
	const rowItems = $(list).find(".views-row");

	const podcasts = [];

	for (const element of rowItems) {
		const item = element;
		const coverImageElement = $(item).find(".img-responsive");
		const h2Element = $(item).find("h2");
		const aElement = $(h2Element).find("a");
		const pElement = $(item).find("p");

		const coverImage = BASE_URL_IMAGE + $(coverImageElement).attr("src");
		const title = $(aElement).text();
		let detailLink = "";
		if ($(aElement).attr("href")) {
			detailLink = BASE_URL_IMAGE + $(aElement).attr("href");
		}
		const description = $(pElement).text();
		let detail = undefined;
		if (detailLink) {
			detail = await getPodcastDetail(detailLink);
		}

		podcasts.push({
			coverImage,
			title,
			detailLink,
			detail,
			description,
		});
	}
	return podcasts;
}

export async function saveToDatabase() {
	// const urls = genUrlFull()
	// let allPodcasts = []
	// for (let i = 0; i < URL_ENDPOINTS.length; i++) {
	//     const htmlText = await getHtmlFromUrl(urls[i])
	//     const crawlArr = await getListPodcastsFromHtml(htmlText)
	//     const temData = crawlArr.map(item => ({
	//         ...item,
	//         level: URL_ENDPOINTS[i]
	//     }))
	//     allPodcasts = [...allPodcasts, ...temData]
	//     console.log(`Page ${i + 1} done`)
	// }
	// PodCastModel.insertMany(allPodcasts, (error, docs) => {
	//     if (error) {
	//         console.error(error)
	//         return
	//     }
	//     console.log("Success", {docs})
	// })
	//   PodCastModel.updateMany(
	//     {},
	//     { $set: { currentProgress: 0, podcastDuration: 0 } },
	//     (error, docs) => {
	//       if (error) {
	//         console.error(error);
	//         return;
	//       }
	//       console.log("Success", { docs });
	//     }
	//   );
	// BookModel.updateMany(
	//   {},
	//   {
	//     $set: { currentPosition: 0, totalLocation: 0 },
	//   },
	//   (error, docs) => {
	//     if (error) {
	//       console.error(error);
	//       return;
	//     }
	//     console.log("Success", { docs });
	//   }
	// );
	let vocabLists = [];
	for (let i = 0; i < Vocab_Urls.length; i++) {
		const vocabList = await getVocabularyLists(Vocab_Urls[i]);
		vocabLists.push(vocabList);
	}
	VocabListModel.insertMany(vocabLists, (error, docs) => {
		if (error) {
			console.error(error);
			return;
		}
		console.log("Success", { docs });
	});
}

export const URL_ENDPOINTS = [
	"a1-listening",
	"a2-listening",
	"b1-listening",
	"b2-listening",
	"c1-listening",
];

export function genUrlFull() {
	const urls = [];
	urls.push(BASE_URL);
	for (let i = 0; i < URL_ENDPOINTS.length - 1; i++) {
		urls.push(BASE_URL + URL_ENDPOINTS[i]);
	}
	return urls;
}
