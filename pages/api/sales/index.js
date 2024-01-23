import Product from "@/models/product";
import Banner from "@/models/banner";
import dbConnect from "@/config/dbConnect";
import product from "@/models/product";

export default async function Handler(req, res) {
  dbConnect();

  try {
    // Find all products with sales
    const productsWithSales = await Product.find({
      $or: [{ sale: true }, { sale: { $exists: true } }],
    });

    // Find the banners
    const banners = await Banner.find();

    // Map over each banner and populate the 'post' field with products that have sales
    const updatedBanners = await Promise.all(
      banners.map(async (banner) => {
        banner.post = await Product.find({
          _id: { $in: productsWithSales.map((product) => product._id) },
        });
        return banner.save();
      })
    );

    res.status(200).json({
      success: true,
      updatedBanners,
    });
  } catch (error) {
    console.error("Error updating banners with products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
