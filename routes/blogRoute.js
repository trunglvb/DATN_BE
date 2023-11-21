import express from "express";
import * as blogController from "../controllers/blogController.js";

const router = express.Router();

router.get("/blog-list", blogController.getBlogList);

router.get("/blog-html", blogController.getBlogHtml);

export default router;
