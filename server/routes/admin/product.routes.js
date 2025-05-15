import express from "express";
import multer from "multer";

import { imageupload } from "../../controllers/imageupload.controller.js";
import {
    addProduct,
    fetchProducts,
    deleteProduct,
    editProduct,
    fetchAllProducts
} from "../../controllers/product.controller.js";

const router = express.Router();

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Image Upload Route
router.post('/upload', upload.single('image'), imageupload);

// ✅ Product Routes
router.post('/products', addProduct);               // Add product
router.get('/products', fetchProducts);             // Fetch all or search
router.put('/products/:id', editProduct);           // Edit product
router.delete('/products/:id', deleteProduct);      // Delete product
router.get('/fetchall',fetchAllProducts);

export default router;
