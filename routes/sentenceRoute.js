import express from "express";
import * as sentenceController from "../controllers/sentenceController.js";

const router = express.Router();

router.get("/sentence-total", sentenceController.getTotalSentences);

router.get("/sentence-list", sentenceController.getSentenceList);
router.put("/sentence/:sentenceId", sentenceController.updateSentenceCheck);

export default router;
