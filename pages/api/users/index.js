import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/user";

export default async function Handler(req, res) {
  dbConnect();

  try {
    const User = await UserModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      User,
    });
  } catch (error) {
    // Error Handle for Required Fields
    if (error.message?.split(":")[2]?.split(",")[0]?.trim()) {
      var errMessage = error.message.split(":")[2].split(",")[0].trim();
      return res.status(400).json({
        success: false,
        message: errMessage,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}
