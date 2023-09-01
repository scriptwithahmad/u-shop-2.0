import dbConnect from "../../../config/dbConnect";
import productModel from "../../../models/product";

export default async function handler(req, res) {
  dbConnect();

  try {
    var match = {};
    var limit = req.query.limit || 12;
    var page = req.query.page || 1;
    var skip = (page - 1) * limit;

    const products = await productModel.find().limit(limit).skip(skip);
    const count = await productModel
      .find(match)
      .limit(limit)
      .skip(skip)
      .count();
    res.status(200).json({
      success: true,
      count,
      products,
    });
  } catch (error) {
    console.log(error);
  }
}
