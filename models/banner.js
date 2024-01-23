import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    bannerText: String,
    photo: {
      trim: true,
      type: String,
      required: [true, "Please select an image"],
    },
    post: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        price: {
          type: String,
        },
        category: {
          type: String,
        },
        images: {
          type: Array,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose?.models?.banners ||
  mongoose.model("banners", bannerSchema);
