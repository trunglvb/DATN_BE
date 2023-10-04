import express from "express";
import * as podcastController from "../controllers/podcastController.js";

const router = express.Router();

router.get("/all-podcasts/", podcastController.getListPodcastsByLevel);

router.put(
  "/update-podcast-progress/:podcastId",
  podcastController.updateProgressPodcast
);

router.get("/recent-podcasts/", podcastController.getRecentPodcast)

export default router;
