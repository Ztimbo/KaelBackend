import Order from "../models/Order.js";
import { errorMessage } from "../helpers/catalogs.js";

const {
    GENERAL_ERROR,
    ORDER_CREATED
} = errorMessage;

const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        res.status(ORDER_CREATED.code).json({message: ORDER_CREATED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().select('-__v');
        res.json(orders);
    } catch(err) {
        console.log(err.message);
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

export {
    createOrder,
    getOrders
}