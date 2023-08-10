import dbConnect from "@/config/dbConnect";
import productModel from "../../../models/product";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const singleProduct = await productModel.findOne({
          slug: req.query.slug,
        });
        res.status(200).json({
          success: true,
          singleProduct,
        });
        console.log(singleProduct)
      } catch (error) {
        console.log(error);
      }
      break;

    case "DELETE":
      try {
        const singleProduct = await productModel.findOne({
          slug: req.query.slug,
        });
        if (!singleProduct) {
          res.status(404).json({
            success: false,
            message: "Product Not Found!",
          });
        } else {
          const delProduct = await productModel.findByIdAndDelete(
            singleProduct._id
          );
          res.status(200).json({
            success: true,
            message: "Product Deleted Successfully!",
          });
        }
      } catch (error) {
        res.status(error);
      }

    default:
      break;
  }
  try {
    const singleProduct = await productModel.findOne({ slug: req.query.slug });
    res.status(200).json({
      success: true,
      singleProduct,
    });
  } catch (error) {
    console.log(error);
  }
}
