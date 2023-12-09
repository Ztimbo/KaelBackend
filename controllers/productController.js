import Product from "../models/Product.js";
import { errorMessage } from "../helpers/catalogs.js";

const {
    GENERAL_ERROR,
    PRODUCT_NAME_ALREADY_CREATED,
    PRODUCT_CREATED,
    PRODUCT_NOT_FOUND,
    PRODUCT_UPDATED,
    PRODUCT_DELETED
} = errorMessage;

const createProduct = async (req, res) => {
    try {
        const {product} = req.body;
        const productExists = await Product.findOne({ product });

        if(productExists) {
            return res.status(PRODUCT_NAME_ALREADY_CREATED.code).json({message: PRODUCT_NAME_ALREADY_CREATED.message});
        }

        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(PRODUCT_CREATED.code).json({message: PRODUCT_CREATED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
};

const updateProduct = async (req, res) => {
    const {id} = req.params;
    
    const savedProduct = await Product.findById(id);

    if(!savedProduct) {
        return res.status(PRODUCT_NOT_FOUND.code).json({message: PRODUCT_NOT_FOUND.message});
    }

    const {product, price} = req.body;

    const productExists = await Product.findOne({product}).where('_id').ne(id);

    if(productExists) {
        return res.status(PRODUCT_NAME_ALREADY_CREATED.code).json({message: PRODUCT_NAME_ALREADY_CREATED.message});
    }

    savedProduct.product = product || savedProduct.product;
    savedProduct.price = price || savedProduct.price;

    try {
        await savedProduct.save();
        res.status(PRODUCT_UPDATED.code).json({message: PRODUCT_UPDATED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v -isActive').where('isActive').equals(true);
        res.json(products);
    } catch(err) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id).select('-__v -isActive');

        if(!product) {
            return res.status(PRODUCT_NOT_FOUND.code).json({message: PRODUCT_NOT_FOUND.message});
        }

        res.json(product);
    } catch(err) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);

    if(!product) {
        return res.status(PRODUCT_NOT_FOUND.code).json({message: PRODUCT_NOT_FOUND.message});
    }

    product.isActive = false;

    try {
        await product.save();
        res.status(PRODUCT_DELETED.code).json({message: PRODUCT_DELETED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

export {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}