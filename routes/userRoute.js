import express from "express";
import * as userController from "../controllers/userController.js";
import {
	validate,
	validateLogin,
	validateSignUp,
} from "../middlewares/validator.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});
router.get("/all-users", userController.getUser);
router.post("/signup", ...validateSignUp, validate, userController.signup);

router.post("/login", ...validateLogin, validate, userController.login);

router.post("/forgot-password", userController.forgotPassword);

router.post("/verify-otp-reset-pass", userController.verifyOTPResetPass);

router.post("/reset-password", userController.resetPassword);

export default router;
