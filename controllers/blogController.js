import { apiHelper } from "../utils/apiHelper.js";
import BlogModel from "../models/BlogModel.js";

export const getBlogList = async (_req, res) => {
	const blogList = await BlogModel.find({}).select("-html");
	if (!blogList) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		blogList,
	});
};

const getBlogHtmlService = async (_id) => {
	try {
		if (!Boolean(_id)) return null;
		const { html = "" } = await BlogModel.findById(_id).select("-_id html");
		return html;
	} catch (error) {}
};

export const getBlogHtml = async (req, res) => {
	const { _id } = req.query;
	if (!Boolean(_id)) {
		return res.status(400).json({ message: "id không hợp lệ" });
	}
	const blogHtml = await getBlogHtmlService(_id);
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		blogHtml,
	});
};
