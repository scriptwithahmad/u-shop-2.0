import dbConnect from "@/config/dbConnect";
import OrderModel from "@/models/orders";
import User from "@/models/user";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        var match = {};

        if (req.query.id) {
          match._id = req.query.id;
        }

        var foundOrders = await OrderModel.find(match).populate({
          path: "hasLoginUserData.user_id",
          modal: User,
          select: ["name", "images", "stock"],
        });

       

        res.json({
          success: true,
          message: foundOrders,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        var order = await OrderModel.create(req.body);

        res.json({
          success: true,
          message: order,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }

      break;
  }
}
