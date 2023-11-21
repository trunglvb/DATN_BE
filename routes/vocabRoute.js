import express from "express";
import * as vocabController from "../controllers/vocabController.js";

const router = express.Router();

router.post("/create-vocab-list", vocabController.createVocabList);
router.get("/all-vocab-lists", vocabController.getAllLists);

export default router;
