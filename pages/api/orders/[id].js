import dbConnect from "@/config/dbConnect";
import OrdersModal from "@/models/orders";

export default async function handler(req, res) {
  dbConnect();

  try {
    const fetchOrder = await OrdersModal.findById(req.query.id);

    if (!fetchOrder) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    const deleteOrder = await OrdersModal.findByIdAndDelete(req.query.id);

    if (!deleteOrder) {
      return res.status(400).json({
        success: false,
        message: "Unable to delete the User!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error: error.message,
    });
  }
}
