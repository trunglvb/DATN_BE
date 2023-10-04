import PodCastModel from "../models/PodCastModel.js";
import { apiHelper } from "../utils/apiHelper.js";

const getListPodcastsByLevel = async (req, res) => {
  const level = req.query.level;

  const podcasts = await PodCastModel.find({ level: level });

  if (!podcasts) {
    return apiHelper.sendError(res, "No data", 404);
  }
  return apiHelper.sendSuccessResponse(res, "Successfully get data", {
    podcasts,
  });
};

const updateProgressPodcast = async (req, res) => {
  const { podcastId } = req.params;
  const { currentProgress: currentListeningProgress, podcastDuration } =
    req.body;
  await PodCastModel.updateOne(
    { _id: podcastId },
    {
      $set: {
        currentProgress: currentListeningProgress,
        podcastDuration: podcastDuration,
      },
    }
  );
  const podcast = await PodCastModel.findById(podcastId);
  if (podcast) {
    return apiHelper.sendSuccessResponse(res, "update progress successfully", {
      podcast,
    });
  }
  return apiHelper.sendError(res, "Podcast Not Found");
};

const getRecentPodcast = async (req, res) => {
  const recentPodcasts = await PodCastModel.find({})
    .sort({ updatedAt: -1 }) // Sắp xếp giảm dần theo updatedAt
    .limit(5);
  // console.log(recentPodcasts);
  if (!recentPodcasts) {
    return apiHelper.sendError(res, "No data", 404);
  }
  return apiHelper.sendSuccessResponse(res, "Successfully get data", {
    recentPodcasts,
  });
};

export { getListPodcastsByLevel, updateProgressPodcast, getRecentPodcast };
