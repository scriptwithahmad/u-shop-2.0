import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    bannerText: String,
    photo: {
      trim: true,
      type: String,
      required: [true, "Please select an image"],
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.banners ||
  mongoose.model("banners", bannerSchema);
