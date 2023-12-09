import Order from "../models/Order.js";
import { errorMessage } from "../helpers/catalogs.js";

const {
    GENERAL_ERROR,
    ORDER_CREATED,
    ORDER_UPDATED,
    ORDER_NOT_FOUND
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
        const orders = await Order.find().select('_id clientName total deliverDate status');
        res.json(orders);
    } catch(err) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const getOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id).populate('items.product').select('-__v');

        if(!order) {
            return res.status(ORDER_NOT_FOUND.code).json({message: ORDER_NOT_FOUND.message});
        }

        res.json(order);
    } catch(err) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const updateOrder = async (req, res) => {
    const {id} = req.params;
    
    const savedOrder = await Order.findById(id);

    if(!savedOrder) {
        return res.status(ORDER_NOT_FOUND.code).json({message: ORDER_NOT_FOUND.message});
    }

    const {clientName, items, total, aditionalInfo, deliverDate} = req.body;

    savedOrder.clientName = clientName || savedOrder.clientName;
    savedOrder.items = items || savedOrder.items;
    savedOrder.total = total || savedOrder.total;
    savedOrder.aditionalInfo = aditionalInfo || savedOrder.aditionalInfo;
    savedOrder.deliverDate = deliverDate || savedOrder.deliverDate;

    try {
        await savedOrder.save();
        res.status(ORDER_UPDATED.code).json({message: ORDER_UPDATED.message});
    } catch(ex) {
        console.log(ex.message);
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

export {
    createOrder,
    getOrders,
    getOrder,
    updateOrder
}