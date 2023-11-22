import express from "express";
import * as wordController from "../controllers/wordController.js";

const router = express.Router();

router.get("/word-details", wordController.getWordDetails);

export default router;
