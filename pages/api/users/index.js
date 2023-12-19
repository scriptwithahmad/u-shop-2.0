import dbConnect from "@/config/dbConnect";
import userModal from "@/models/user";

export default async function handler(req, res) {
  dbConnect();

  try {
    var match = {};
    var users = {};

    const page = req.query.page || 1;
    const limit = req.query.limit || 1;
    const skip = (page - 1) * limit;

    if (req.query.name) {
      match.name = new RegExp(req.query.name, "i");
    } else if (req.query.category) {
      match.category = new RegExp(req.query.category, "i");
    } else if (req.query.seller) {
      match.seller = new RegExp(req.query.seller, "i");
    }

    users = await userModal
      .find(match, {
        description: 0,
        reviews: 0,
        ratings: 0,
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
      console.log(users)

    const totalUser = await userModal.find(match).count();

    var starting = totalUser ? skip + 1 : 0;
    var ending =
      starting + limit > totalUser ? totalUser : starting + limit - 1;

    res.status(200).json({
      success: true,
      message: {
        totalUser,
        users,
        starting,
        ending,
        page,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
