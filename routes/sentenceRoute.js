import express from "express";
import * as sentenceCpntroller from "../controllers/sentenceController.js";

const router = express.Router();

router.get("/sentence-total", sentenceCpntroller.getTotalSentences);

router.get("/sentence-list", sentenceCpntroller.getSentenceList);

export default router;
