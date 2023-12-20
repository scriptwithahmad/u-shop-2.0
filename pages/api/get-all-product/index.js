import dbConnect from "../../../config/dbConnect";
import productModel from "../../../models/product";

export default async function handler(req, res) {
  dbConnect();

  try {
    var match = {};
    var ProductData = {};

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;
    const skip = (page - 1) * limit;

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
        reviews: 0,
        ratings: 0,
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const TotalProducts = await productModel.find(match).count();

    var starting = TotalProducts ? skip + 1 : 0;
    var ending =
      starting + limit > TotalProducts ? TotalProducts : starting + limit - 1;

    res.status(200).json({
      success: true,
      message: {
        TotalProducts,
        ProductData,
        starting,
        ending,
        page,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
