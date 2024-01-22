import bannerModel from "@/models/banner";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "DELETE":
        const removebanner = await bannerModel.findByIdAndDelete(req.query.id);
        res.status(200).json({
          success: true,
          message: "Banner deleted successfully",
        });
        break;

      case "GET":
        try {
          const singleBanner = await productModel.findOne(req.query.id);
          res.status(200).json({
            success: true,
            singleBanner,
          });
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
}
