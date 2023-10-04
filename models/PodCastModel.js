import mongoose from "mongoose";

const { Schema } = mongoose;

const podCastSchema = new Schema(
  {
    title: String,
    coverImage: String,
    detailLink: String,
    detail: {
      audioLink: String,
      transcriptItems: [
        {
          person: String,
          speech: String,
        },
      ],
    },
    description: String,
    level: String,
    currentProgress: Number,
    podcastDuration: Number,
  },
  {
    timestamps: true,
  }
);

const PodCastModel = mongoose.model("podcast_model", podCastSchema);

export default PodCastModel;
