import { apiHelper } from "../utils/apiHelper.js";
import PodCastModel from "../models/PodCastModel.js";
import BookModel from "../models/BookModel.js";

const getAllLessonStatus = async (_req, res) => {
  let totalListening = 0;
  let totalCurrentProgress = 0;
  let totalReadBooks = 0;
  let totalCurrentBookLocations = 0;
  const allPodcasts = await PodCastModel.find({});
  const allBooks = await BookModel.find({});
  allPodcasts.forEach((item) => {
    totalListening += item.podcastDuration;
    totalCurrentProgress += item.currentProgress;
  });
  allBooks.forEach((book) => {
    totalReadBooks += book.totalLocation;
    totalCurrentBookLocations += book.currentPosition;
  });

  return apiHelper.sendSuccessResponse(res, "get all successfully", {
    currentListeningProgress: Math.round(
      (totalCurrentProgress / totalListening) * 100
    ),
    currentBookProgress: Math.round(
      (totalCurrentBookLocations / totalReadBooks) * 100
    ),
  });
};

export { getAllLessonStatus };
