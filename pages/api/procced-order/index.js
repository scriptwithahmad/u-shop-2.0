import { OtpTemplate } from "@/data";
import userModal from "@/models/user";
import mailjet from "@/helpers/mailjet";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong with the update!",
      error: error.message,
    });
  }
}
