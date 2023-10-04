import express from "express";
import * as vocabController from "../controllers/vocabController.js";

const router = express.Router();

// router.post("/create-vocab-list/user/:userId", vocabController.createVocabList);

router.get("/all-vocab-lists/user/:userId", vocabController.getAllLists);

// router.get(
//   "/vocab-list-detail/user/:userId/list/:listId",
//   vocabController.getListDetail
// );

// router.post("/add-new-word/list/:listId", vocabController.addNewWord);

// router.delete(
//   "/delete-word/list/:listId/word/:wordId",
//   vocabController.deleteWord
// );

export default router;
