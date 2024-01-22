import bannerModel from "@/models/banner";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    switch (req.method) {
      case "POST":
        try {
          const saleBanner = await bannerModel.create(req.body);
          res.status(201).json({
            success: true,
            saleBanner,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Internal Server Error!",
          });
        }

        break;

      case "GET":
        try {
          const getAllBanners = await bannerModel.find();
          res.status(200).json({
            success: true,
            getAllBanners,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Internal Server Error!",
          });
        }

        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);

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
