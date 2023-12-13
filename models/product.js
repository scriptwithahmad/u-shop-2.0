import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Product Name"],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Enter Product Description"],
  },
  price: {
    type: String,
    required: [true, "Enter Product Price"],
  },
  sale: {
    type: String,
    required: [true, "Enter Sale Avalibilty!"],
    default: 0,
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
      values: ["Men", "Women", "Kids", "Sports"],
      message: "Category Not Found",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: String,
    required: [true, "Please Enter Product Stock"],
  },
  ratings: {
    type: Number,
    default: 1,
  },
  reviews: [
    {
      costomerName: {
        type: String,
      },
      NoOfreviews: {
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
