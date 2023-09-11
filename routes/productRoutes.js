import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { createProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.route('/').post(checkAuth, createProduct).get(checkAuth, getProducts);
router.route('/:id').get(checkAuth, getProduct).put(checkAuth, updateProduct).delete(checkAuth, deleteProduct);

export default router;