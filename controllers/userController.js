import User from "../models/User.js";
import { errorMessage } from "../helpers/catalogs.js";
import generateJWT from "../helpers/token.js";

const { 
    USERNAME_ALREADY_IN_USE, 
    USER_CREATED, 
    GENERAL_ERROR, 
    USER_NOT_FOUND, 
    INCORRECT_PASSWORD,
    USER_UPDATED,
    USER_DELETED
} = errorMessage;

const createUser = async (req, res) => {
    try {
        const {userName} = req.body;
        const userExists = await User.findOne({ userName });

        if(userExists) {
            const error = new Error(USERNAME_ALREADY_IN_USE.message);
            return res.status(USERNAME_ALREADY_IN_USE.code).json({message: USERNAME_ALREADY_IN_USE.message});
        }

        const user = new User(req.body);
        await user.save();

        res.status(USER_CREATED.code).json({message: USER_CREATED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user) {
        return res.status(USER_NOT_FOUND.code).json({message: USER_NOT_FOUND.message});
    }

    const {userName, name, surname} = req.body;

    const existingUserName = await User.findOne({userName});

    if(existingUserName && existingUserName._id.toString() !== id) {
        return res.status(USERNAME_ALREADY_IN_USE.code).json({message: USERNAME_ALREADY_IN_USE.message});
    }

    user.userName = userName || user.userName;
    user.name = name || user.name;
    user.surname = surname || user.surname;

    try {
        await user.save();
        res.status(USER_UPDATED.code).json({message: USER_UPDATED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user) {
        return res.status(USER_NOT_FOUND.code).json({message: USER_NOT_FOUND.message});
    }

    user.isActive = false;

    try {
        await user.save();
        res.status(USER_DELETED.code).json({message: USER_DELETED.message});
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v').where('isActive').equals(true);
        res.json(users);
    } catch(err) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password -__v');

        if(!user) {
            return res.status(USER_NOT_FOUND.code).json({message: USER_NOT_FOUND.message});
        }

        res.json(user);
    } catch(err) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

const authenticate = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName}).where('isActive').equals(true);
        if(!user) {
            const error = new Error(USER_NOT_FOUND.message);
            return res.status(USER_NOT_FOUND.code).json({message: error.message});
        }
        
        if(await user.comparePassword(password)) {
            res.json({
                _id: user._id,
                userName: user.userName,
                name: user.name,
                surname: user.surname,
                token: generateJWT(user._id)
            });
        } else {
            const error = new Error(INCORRECT_PASSWORD.message);
            return res.status(INCORRECT_PASSWORD.code).json({message: error.message});
        }
    } catch(ex) {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
};

const profile = async (req, res) => {
    try {
        const {user} = req;
        res.json(user);
    } catch {
        res.status(GENERAL_ERROR.code).json({message: GENERAL_ERROR.message});
    }
}

export {
    createUser,
    authenticate,
    profile,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}