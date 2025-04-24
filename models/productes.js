import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    ProductID: {
        type: String,
        required: true,
        unique: true // Product ID should be unique
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductlabelPrice: {
        type: Number,
        required: true
    },
    ProductImage: {
        type: [String],
        required: true,
        default:[]
    },
    ProductStoke: {
        type: Number,
        required: true,
        
    },
    ProductCategory: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true // default value for availability
    }

})
const Product = mongoose.model("Product", productSchema);
export default Product;