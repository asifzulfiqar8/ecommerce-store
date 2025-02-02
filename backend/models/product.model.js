import {mongoose, Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    image:{
        type: String,
        required: [true, "Image is required"]
    },
    category: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        require: true,
    }
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

export default Product;
