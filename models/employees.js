import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is Required!"],
    },
    employeeID: {
      type: Number,
      required: true,
      unique: true,
    },
    cnic: {
      type: String,
      unique: true,
      required: [true, "CNIC is Required!"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone Number is Required!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required!"],
    },
    photo: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is Required!"],
    },
    joining_date: {
      type: Date,
      required: [true, "Date of Birth is Required!"],
    },
    department: {
      type: String,
      required: [true, "Role Title is Required!"],
    },
    jobDescription: {
      type: String,
      required: [true, "Role Description is Required!"],
    },
    checkin: {
      type: String,
      required: [true, "Checkin Time is Required!"],
    },
    checkout: {
      type: String,
      required: [true, "Checkout Time is Required!"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive", "Resigned", "Fired"],
      default: "Active",
    },
    resignedOrFiredDate: {
      type: Date,
    },
    salary: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.employees || mongoose.model("employees", EmployeeSchema);
