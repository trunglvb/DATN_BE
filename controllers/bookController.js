import BookModel from "../models/BookModel.js";
import { apiHelper } from "../utils/apiHelper.js";

const getListBook = async (_req, res) => {
  const books = await BookModel.find();

  if (!books) {
    return apiHelper.sendError(res, "No data", 404);
  }
  return apiHelper.sendSuccessResponse(res, "Successfully get data", {
    books,
  });
};

const getBookDetail = async (req, res) => {
  const book = await BookModel.findById(req.params.id);

  if (!book) {
    return apiHelper.sendError(res, "No Data", 404);
  }
  return apiHelper.sendSuccessResponse(res, "Successfully", {
    book,
  });
};

const addNewBook = async (req, res) => {
  const tempNewBook = req.body;
  const newBook = new BookModel({
    ...tempNewBook,
  });
  await newBook.save();
  return apiHelper.sendSuccessResponse(res, "Successfully add new book", {
    newBook,
  });
};

const updateBookPosition = async (req, res) => {
  const { bookId } = req.params;
  const { currentPosition, totalPosition } = req.body;
  await BookModel.updateOne(
    { _id: bookId },
    { $set: { currentPosition: currentPosition, totalLocation: totalPosition } }
  );
  const book = await BookModel.findById(bookId);
  if (!bookId) {
    return apiHelper.sendError(res, "Book Not Found");
  }
  console.log("Oke");
  return apiHelper.sendSuccessResponse(res, "Successfully", { book });
};

export { getListBook, addNewBook, getBookDetail, updateBookPosition };
