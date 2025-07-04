import { Product } from "../models/product.model.js";
export const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: savedProduct
        });
    } catch (e) {
        console.error("Add Product Error:", e);

        if (e.name === "ValidationError") {
            const errors = Object.values(e.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while adding product"
        });
    }
};

export const fetchProducts = async (req, res) => {
    try {
        const { search, brand, category } = req.query;

        // If a search by product title is provided
        if (search) {
            const product = await Product.findOne({ title: search });

            if (!product) {
                if (!req.body || Object.keys(req.body).length < 6) {
                    return res.status(404).json({
                        success: false,
                        message: `Product with title "${search}" not found. Provide complete product details in body to create one.`
                    });
                }

                const newProduct = new Product(req.body);
                const saved = await newProduct.save();

                return res.status(201).json({
                    success: true,
                    message: "Product not found. New product added.",
                    data: saved
                });
            }

            return res.status(200).json({
                success: true,
                message: "Product found",
                data: product
            });
        }

        // If brand or category are provided, filter accordingly
        let filter = {};
        if (brand) filter.brand = brand;
        if (category) filter.category = category;

        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            message: Object.keys(filter).length
                ? `Products filtered by ${Object.keys(filter).join(" and ")}`
                : "All products fetched",
            data: products
        });
    } catch (e) {
        console.error("Fetch Products Error:", e);
        res.status(500).json({
            success: false,
            message: "Server error while fetching products"
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (e) {
        console.error("Delete Product Error:", e);
        res.status(500).json({
            success: false,
            message: "Server error while deleting product"
        });
    }
};
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (e) {
        console.error("Edit Product Error:", e);

        if (e.name === "ValidationError") {
            const errors = Object.values(e.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while updating product"
        });
    }
};
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: products
        });
    } catch (e) {
        console.error("Fetch All Products Error:", e);
        res.status(500).json({
            success: false,
            message: "Server error while fetching all products"
        });
    }
};
