import { OtpTemplate } from "@/data";
import userModal from "@/models/user";
import mailjet from "@/helpers/mailjet";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    const { fullname, email, _id } = req.body;
    // console.log(fullname, email, _id);

    var otp = {
      value: Math.floor(100000 + Math.random() * 900000),
      expirationTime: new Date().getTime() + 60000,
    };

    console.log(otp);

    var mailData = await mailjet(
      email,
      fullname,
      "Verify Your Email - Edifycit",
      // OtpTemplate(otp.value)
      "hey message"
    );

    // console.log(mailData?.Messages[0].To);

    var r = await userModal.findByIdAndUpdate(
      _id,
      { $set: { otp } },
      { new: true }
    );

    console.log(r);

    res.json({
      success: true,
      mailData,
      message: "Check your Email!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong with the update!",
      error: error.message,
    });
  }
}
