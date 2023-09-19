import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.route('/').post(checkAuth, createOrder).get(checkAuth, getOrders);

export default router;