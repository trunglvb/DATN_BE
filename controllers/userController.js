import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import VerifyTokenModel from "../models/verifyTokenModel.js";
import "dotenv/config";
import mongoose from "mongoose";
import { apiHelper } from "../utils/apiHelper.js";
import { PASS_REGEX, utils } from "../utils/utils.js";
import ResetTokenModel from "../models/resetTokenModel.js";
import { mailer } from "../utils/mailer.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getUser = async (_req, res) => {
	const users = await UserModel.find();

	if (!users) {
		return apiHelper.sendError(res, "No data", 404);
	}
	return apiHelper.sendSuccessResponse(res, "Successfully get data", {
		users,
	});
};
const signup = async (req, res) => {
	const { fullName, email, password } = req.body;
	const existingUser = await UserModel.findOne({ email: email });

	if (existingUser) {
		return apiHelper.sendError(
			res,
			"User already existed. Please login instead",
			402
		);
	}
	const user = new UserModel({
		fullName: fullName,
		email: email,
		password: password,
	});
	const OTP = utils.generateOTP();
	const token = new VerifyTokenModel({
		owner: user._id,
		token: OTP,
	});
	try {
		await user.save();
		await token.save();
		await mailer.mailTransport().sendMail(
			{
				from: "hoangtiendat.work@gmail.com",
				to: user.email,
				subject: "Verify your account",
				html: mailer.generateEmailTemplate(
					user.fullName,
					OTP,
					"Sign up"
				),
			},
			function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent, " + info.response);
				}
			}
		);
		return apiHelper.sendSuccessResponse(
			res,
			"Signup successfully",
			{ user },
			201
		);
	} catch (e) {
		console.log(e);
		return apiHelper.sendError(res, "Error occurs!", 400);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const existingUser = await UserModel.findOne({ email: email });

	if (!existingUser) {
		return apiHelper.sendError(
			res,
			"User does not exist. Please signup",
			400
		);
	}
	const isPasswordCorrect = await existingUser.comparePassword(password);
	if (!isPasswordCorrect) {
		return apiHelper.sendError(res, "Password/Email is incorrect", 400);
	}
	const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
		expiresIn: "24hr",
	});
	return apiHelper.sendSuccessResponse(res, "Login successfully!", {
		user: existingUser,
		token: token,
	});
};

const verifyEmail = async (req, res) => {
	const { userId, otp } = req.body;
	if (!userId || !otp.trim()) {
		return apiHelper.sendError(res, "Invalid request, missing parameters!");
	}
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return apiHelper.sendError(res, "Invalid user id");
	}
	const user = await UserModel.findById(userId);
	if (!user) {
		return apiHelper.sendError(res, "Sorry, user not found!");
	}
	if (user.verified) {
		return apiHelper.sendError(res, "This account is already verified!");
	}
	const token = await VerifyTokenModel.findOne({ owner: user._id });
	console.log(token);
	if (!token) {
		return apiHelper.sendError(res, "Sorry, user not found!");
	}
	const isMatched = await token.compareToken(otp);
	if (!isMatched) {
		return apiHelper.sendError(res, "Please provide a valid token!");
	}
	user.verified = true;
	await VerifyTokenModel.findByIdAndDelete(token._id);
	await user.save();
	const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
		expiresIn: "24hr",
	});
	await mailer.mailTransport().sendMail(
		{
			from: "hoangtiendat.work@gmail.com",
			to: user.email,
			subject: "Verify your account",
			html: mailer.plainEmailTemplate(
				"Email verified successfully",
				"Thanks for connecting with us"
			),
		},
		function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent, " + info.response);
			}
		}
	);
	return apiHelper.sendSuccessResponse(res, "Successfully verified!", {
		user,
		token: jwtToken,
	});
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return apiHelper.sendError(res, "Please provide a valid email!");
	}
	const user = await UserModel.findOne({ email: email });
	if (!user) {
		return apiHelper.sendError(res, "User not found!");
	}
	// const token = await ResetTokenModel.findOne({owner: user._id})
	// if (token) {
	//     return apiHelper.sendError(res,
	//         'Only after one hour you can request for another token')
	// }
	const randomOTP = utils.generateOTP();
	const resetToken = new ResetTokenModel({
		owner: user._id,
		token: randomOTP,
	});
	await resetToken.save();
	await mailer.mailTransport().sendMail(
		{
			from: "hoangtiendat.work@gmail.com",
			to: user.email,
			subject: "You have requested to reset your password",
			html: mailer.generateEmailTemplate(
				user.fullName,
				randomOTP,
				"Reset password"
			),
		},
		function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent, " + info.response);
			}
		}
	);
	return apiHelper.sendSuccessResponse(
		res,
		"Password reset otp " +
			"has been sent to your email! " +
			"Please check your email!"
	);
};

const verifyOTPResetPass = async (req, res) => {
	const { email, otp } = req.body;
	if (!email || !otp) {
		return apiHelper.sendError(res, "Please provide a valid email/otp!");
	}
	const user = await UserModel.findOne({ email: email }).select("-password");
	if (!user) {
		return apiHelper.sendError(res, "User not found!");
	}
	const token = await ResetTokenModel.findOne({ owner: user._id });
	const isTokenMatched = token.compareToken(otp);
	if (!isTokenMatched) {
		return apiHelper.sendError(res, "Please provide a valid token!");
	}
	return apiHelper.sendSuccessResponse(res, "Verified successfully", {
		user,
	});
};

const resetPassword = async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email: email });
	if (!user) {
		return apiHelper.sendError(res, "User not found!");
	}
	const isSamePass = await user.comparePassword(password);
	if (isSamePass) {
		return apiHelper.sendError(res, "New password must be different");
	}
	const isPassValid = PASS_REGEX.test(password);
	if (!isPassValid) {
		return apiHelper.sendError(
			res,
			"password is invalid, 8-24 characters, " +
				"include at least 1 number" +
				"at least 1 special char!"
		);
	}
	user.password = password.trim();
	await user.save();
	await ResetTokenModel.findOneAndDelete({ owner: user._id });
	const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
		expiresIn: "24hr",
	});
	await mailer.mailTransport().sendMail(
		{
			from: "hoangtiendat.work@gmail.com",
			to: user.email,
			subject: "Reset password successfully",
			html: mailer.plainEmailTemplate(
				"Reset password successfully",
				"Thanks for connecting with us"
			),
		},
		function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent, " + info.response);
			}
		}
	);
	return apiHelper.sendSuccessResponse(res, "Reset password successfully!", {
		user,
		token: jwtToken,
	});
};
const deleteUser = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndDelete(req.params.id);

		res.status(200).json("delete");
	} catch (error) {
		res.status(500).json(error);
	}
};

export {
	signup,
	login,
	forgotPassword,
	verifyOTPResetPass,
	resetPassword,
	getUser,
	deleteUser,
	verifyEmail,
};
