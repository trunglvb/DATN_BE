import express from "express";
import * as vocabController from "../controllers/vocabController.js";

const router = express.Router();

router.post("/create-vocab-list", vocabController.createVocabList);

router.get("/all-vocab-lists", vocabController.getAllLists);

router.get("/vocab-list-detail/:listId", vocabController.getListDetail);

router.post("/add-new-word/list/:listId", vocabController.addNewWord);

router.delete(
	"/delete-word/list/:listId/word/:wordId",
	vocabController.deleteWord
);

export default router;
