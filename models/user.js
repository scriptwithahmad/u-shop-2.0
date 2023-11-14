import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: [true, "enter fullname name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "enter email name"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "enter password name"],
  },
  profileImg: {
    type: String,
    trim: true,
    default: null,
    required: [true, "upload your Image"],
  },
  role: {
    type: String,
    role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' }
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
