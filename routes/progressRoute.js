import express from "express";
import * as progressController from "../controllers/progressController.js";

const router = express.Router();

router.get("/all-lesson-status", progressController.getAllLessonStatus);

export default router;
