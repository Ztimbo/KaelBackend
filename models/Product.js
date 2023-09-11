import mongoose from 'mongoose';

const productoSchema = mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productoSchema);
export default Product;