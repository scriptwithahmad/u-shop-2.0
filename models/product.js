import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter product name"],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "enter product description"],
  },
  price: {
    type: String,
    required: [true, "enter product price"],
  },
  avatar: {
    type: String,
  },
  images: {
    type: Array,
  },
  category: {
    type: String,
    required: [true, "please enter product category"],
    enum: {
      values: ["Watches", "Cameras", "Tablets", "Mobiles", "Earbuds"],
      message: "category not found",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: String,
    required: [true, "Please enter product stock"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.models?.product ||
  mongoose.model("product", productSchema);
