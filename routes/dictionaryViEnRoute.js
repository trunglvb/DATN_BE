import express from "express";
import * as dictionaryViEnController from "../controllers/ditionaryViEnController.js";

const router = express.Router();

router.get("/all-dict-vien", dictionaryViEnController.getListDictionaryViEn);
router.get("/word-vien/:word", dictionaryViEnController.getListWordViEn);
router.get("/word-details/:word", dictionaryViEnController.getWordViEnDetails);
router.post("/translation/vi-en", dictionaryViEnController.textTranslationViEn);
router.post("/translation/en-vi", dictionaryViEnController.textTranslationEnVi);

export default router;
