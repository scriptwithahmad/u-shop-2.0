import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
        unitPrice: {
          type: Number,
        },
      },
    ],
    customerDetail: {
      fullname: String,
      phone: String,
      email: String,
      city: String,
      address: String,
    },
    isLoginUserDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isLoginUserAddress: {
      type: String,
    },
    isLoginUserName: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      required: true,
      enum: ["Pending", "Confirmed"],
    },
    hasLoginUserData: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.models?.orders || mongoose.model("orders", schema);
