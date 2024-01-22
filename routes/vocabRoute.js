import express from "express";
import * as vocabController from "../controllers/vocabController.js";

const router = express.Router();

router.post("/create-vocab-list", vocabController.createVocabList);
router.post("/add-new-vocab", vocabController.addVocabTopic);
router.get("/all-vocab-lists", vocabController.getAllLists);
router.delete("/delete-word/user/:userId/:wordId", vocabController.deleteWord);

export default router;
