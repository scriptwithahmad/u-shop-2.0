import mongoose from "mongoose";

const AttendenceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    checkin: {
      type: Date,
    },
    checkout: {
      type: Date,
    },
    duration: {
      type: String,
    },
    workHourPercentage: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["A", "P","O", "L", "G"],
      default: "A",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.attendences ||
  mongoose.model("attendences", AttendenceSchema);
