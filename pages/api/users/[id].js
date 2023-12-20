import dbConnect from "@/config/dbConnect";
import userModal from "@/models/user";

export default async function handler(req, res) {
  dbConnect();

  try {
    const fetchOneUser = await userModal.findOne(req.query.id);
    if (!fetchOneUser) {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    } else {
      const delProduct = await userModal.findByIdAndDelete(fetchOneUser._id);
      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(error?.message);
  }
}
