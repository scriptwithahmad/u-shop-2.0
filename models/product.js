import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "enter product name"]
    },
    description:{
        type: String,
        required: [true, "enter product description"]
    },
    price :{
        type: String,
        required: [true, "enter product price"]
    },
    images: [
        {
            public_id:{
                type: String
            },
            url:{
                type: String
            },
        }
    ],
    category: {
        type: String,
        required: [true, "please enter product category"],
        enum: {
            values: [
                "Enectronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Sports",
            ],
            message: "category not found"
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            rating:{
                type: Number,
                default: 0,
            },
            comment: {
                    type: String,
                    required: true,
            },
            createdAt: {
                    type: String,
                    default: Date.now,
            }
        }
    ],
    createdAt: {
        type: String,
        default: Date.now,
    }
})

export default mongoose.models?.product || mongoose.model("product", productSchema)



