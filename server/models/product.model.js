import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Product image URL is required"],
        trim: true
    },
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true
    },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    salePrice: {
        type: Number,
        min: [0, "Sale price cannot be negative"]
    },
    totalStock: {
        type: Number,
        required: [true, "Total stock is required"],
        min: [0, "Stock cannot be negative"]
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
