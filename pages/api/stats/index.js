import dbConnect from "@/config/dbConnect";
import productModel from "../../../models/product";
import userModal from "@/models/user";
import ordersModal from "@/models/orders";

export default async function handler(req, res) {
  dbConnect();

  try {
    const products = await productModel.find().count();
    const users = await userModal.find().count();
    const orders = await ordersModal.find().count();
    res.status(200).json({
      success: true,
      products,
      users,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
