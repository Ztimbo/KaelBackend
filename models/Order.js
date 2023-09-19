import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    aditionalInfo: {
        type: String,
        required: false
    },
    deliverDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        default: 'Creada'
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;