import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorMessage } from "../helpers/catalogs.js";

const { INVALID_TOKEN } = errorMessage;

const checkAuth = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({_id: decoded.id}).select("-password -createdAt -updatedAt");
        } catch(ex) {
            return res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
        }
    }

    if(!token) {
        const error = new Error(INVALID_TOKEN.message);
        return res.status(INVALID_TOKEN.code).json({message: error.message});
    }

    return next();
};

export default checkAuth;