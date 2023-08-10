import dbConnect from "../../../config/dbConnect";
import productModel from "../../../models/product";



export default async function handler(req, res){

    dbConnect()

    try {
        var match = {}

        const products = await productModel.find()  
        const count = await productModel.find(match).count()      
        res.status(200).json({
            success: true,
            count,
            products,
          });
    } catch (error) {
      console.log(error)
    }
}

