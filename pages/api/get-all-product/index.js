import dbConnect from "../../../config/dbConnect";
import productModel from "../../../models/product";

export default async function handler(req, res) {
  dbConnect();

  try {
    var match = {};
    var ProductData = {};

    if (req.query.name) {
      match.name = new RegExp(req.query.name, "i");
    } else if (req.query.category) {
      match.category = new RegExp(req.query.category, "i");
    } else if (req.query.seller) {
      match.seller = new RegExp(req.query.seller, "i");
    }

    ProductData = await productModel
      .find(match, {
        description: 0,
        images: 0,
        ratings: 0,
        avatar: 0,
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ProductData,
    });
  } catch (error) {
    console.log(error);
  }
}
