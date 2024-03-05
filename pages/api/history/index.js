import dbConnect from "@/config/dbConnect";
import userModel from "@/models/users";
import { JWTVerify } from "@/helpers/jwt";
import ordersModal from "@/models/orders";

export default async function handler(req, res) {
  dbConnect();

  try {
    var token = req.cookies.AccessToken || "";
    var id = (await JWTVerify(token)) || req.query.id;

    // Find the user based on the ID
    const user = await userModel.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Find all orders associated with the user
    const orders = await ordersModal
      .find({ hasLoginUserData: id })
      .populate("hasLoginUserData", "fullname email")
      // .populate({
      //   path: "items.productID",
      //   modal: Products,
      //   select: ["name", "images", "stock"],
      // });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.status(400).json({
        success: false,
        message: null,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
