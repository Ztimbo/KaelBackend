//External dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Internal dependencies
import conn from "./config/db.js";

//Routes
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from './routes/orderRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();

conn();

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error en CORS"));
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening in port: ${PORT}`);
});