import express from "express";
import multer from "multer";
import * as bookController from "../controllers/bookController.js";
import BookModel from "../models/BookModel.js";
import { FileParser } from "../utils/parseFile.js";

const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded files

const router = express.Router();

router.get("/all-books", bookController.getListBook);

//FE k dung
router.post("/add-book", bookController.addNewBook);

router.get("/book-detail/:id", bookController.getBookDetail);

//FE k dung
router.put("/update-position/:bookId", bookController.updateBookPosition);

// Route for file upload
router.post("/upload", async (req, res) => {
	try {
		// Upload to S3 bucket
		const uploadRes = await FileParser.parseFile(req);
		console.log(uploadRes);

		const bookName = uploadRes?.Key?.split("-")[1];

		// Save the book to the database
		const book = new BookModel({
			title: bookName,
			filePath: uploadRes.Location,
		});
		await book.save();

		res.status(200).send({ url: uploadRes.Location });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Error uploading book.", err: error });
	}
});

export default router;
