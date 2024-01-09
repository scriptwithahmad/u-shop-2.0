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
      firstName: String,
      lastName: String,
      phone: String,
      email: String,
      city: String,
      address: String,
    },
    isLoginUserDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.models?.orders || mongoose.model("orders", schema);
