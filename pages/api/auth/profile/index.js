import dbConnect from "@/config/dbConnect";
import userModel from "@/models/user";

export default async function handler(req, res) {
  dbConnect();

  try {
    var id = JSON.parse(atob(req.cookies.AccessToken.split(".")[1])).id;

    const foundUser = await userModel.findById(id, { password: false });

    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: "Profile Not Found!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: foundUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
