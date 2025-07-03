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

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), imageupload);

router.post('/products', addProduct);
router.get('/products', fetchProducts);
router.put('/products/:id', editProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/all', fetchAllProducts);

export default router;
