import express from "express";
import * as gameController from "../controllers/gameController.js";

const router = express.Router();

router.get("/correct-word/pack", gameController.getWordPackCWG);

router.get("/word-match/pack", gameController.getWordPackWMG);

export default router;
