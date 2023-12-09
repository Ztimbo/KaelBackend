import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { createOrder, getOrder, getOrders, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route('/').post(checkAuth, createOrder).get(checkAuth, getOrders);
router.route('/:id').get(checkAuth, getOrder).put(checkAuth, updateOrder);

export default router;